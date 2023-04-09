<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Municipios;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\ControlPagos;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
class CarteraVencidaController extends Controller
{
    public function index(Request $request)
    {
        $grupo = $request->grupo;

        $res = $this->getCarteraVencida('municipios', $grupo);

        return response()->json([
            'datos' => $res,
        ]);
    }

    public function indexByMunicipio(Request $request)
    {
        $idMunicipio = $request->idMunicipio;

        $res = $this->getDatosReportePorMunicipio($idMunicipio);

        if (is_object($res)) {
            $clientes = $res->clientes;
            $clientesArray = array();

            foreach ($clientes as $cliente) {
                array_push($clientesArray, $cliente);
            }

            $res->clientes = $clientesArray;
        }

        return response()->json([
            'datos' => $res,
        ]);
    }


    public static function getCarteraVencida($agrupadosPor = 'municipios', $grupo, $idMunicipio = null) 
    {
        $buscarPorMunicipio = !is_null($idMunicipio) ? "AND  municipio.idMunicipio = $idMunicipio " : '';
        $sqlAgrupar = $agrupadosPor == 'municipios' ? 'municipio.idMunicipio' : 'control.cliente_id, control.fechaSemana';
        $sqlMostrar = $agrupadosPor == 'municipios' 
        ? 'municipio.nombreMunicipio as municipio, count(cliente_id) as abonos, sum(control.monto) as montos, ' 
        : "concat(cliente.nombre , ' ' , cliente.apellido_paterno , ' ', cliente.apellido_materno ) as cliente, 
        ( select count(control1.id) FROM control_pagos control1 
            WHERE control1.cliente_id = control.cliente_id and control1.fechaPago is null 
            AND control1.fechaSemana < date(now()) ) as abonos,
        ( select sum(control1.monto) FROM control_pagos control1 WHERE control1.cliente_id = control.cliente_id and control1.fechaPago is null AND control1.fechaSemana < date(now()) ) as montos,
       ";

        $query = DB::select("SELECT  $sqlMostrar
                control.id id,
                municipio.idMunicipio as idMunicipio,
                cliente.idCliente,
                control.fechaSemana, 
                grupo.idGrupo as grupo,
                grupo.nombreGrupo 
        FROM control_pagos control 
        INNER JOIN clientes cliente on control.cliente_id = cliente.idCliente
        INNER JOIN municipios as municipio on cliente.municipio_id = municipio.idMunicipio
        INNER JOIN grupos grupo on cliente.grupo_id = grupo.idGrupo
        WHERE fechaPago is null AND fechaSemana < date(now()) $buscarPorMunicipio
        group by $sqlAgrupar
        ");

        return $query;
    } 

    public static function getCarteraVencidaPorMunicipio( $idMunicipio ) 
    {
        $sqlAgrupar = 'municipio.idMunicipio';
        $sqlMostrar = 'municipio.nombreMunicipio as municipio,';

        $query = DB::select("SELECT  $sqlMostrar
                count(cliente_id) as abonos,
                sum(control.monto) as montos,
                municipio.idMunicipio as idMunicipio
        FROM control_pagos control 
        INNER JOIN clientes cliente on control.cliente_id = cliente.idCliente
        INNER JOIN municipios as municipio on cliente.municipio_id = municipio.idMunicipio
        WHERE fechaPago is null AND fechaSemana < date(now()) AND  municipio.idMunicipio =  $idMunicipio
        group by $sqlAgrupar
        ");

        return $query;
    } 

    


    public function getDatosReporte() {
        $grupo = 1;
        
        $datosAgrupadosPorMunicipios = self::getCarteraVencida('municipios', $grupo);
        $datosAgrupadosPorClientes = self::getCarteraVencida('clientes', $grupo);
        
        return array_map(function ($el) use ($datosAgrupadosPorClientes) {
            $clientesPorMunicipio = array_filter($datosAgrupadosPorClientes, function ($dato) use($el){
                return $dato->idMunicipio == $el->idMunicipio;
            });
            $el->clientes = count($clientesPorMunicipio) > 1 ? $clientesPorMunicipio : [reset($clientesPorMunicipio)];
            return $el;
        }, $datosAgrupadosPorMunicipios);
    }

    public function getDatosReportePorMunicipio($idMunicipio) {
        $grupo = 1;
        
        $datosAgrupadosPorMunicipios = self::getCarteraVencidaPorMunicipio($idMunicipio);
        $datosAgrupadosPorClientes = self::getCarteraVencida('clientes', $grupo, $idMunicipio);
        
        return array_map(function ($el) use ($datosAgrupadosPorClientes) {
            $clientesPorMunicipio = array_filter($datosAgrupadosPorClientes, function ($dato) use($el){
                return $dato->idMunicipio == $el->idMunicipio;
            });
            $el->clientes = count($clientesPorMunicipio) > 1 ? $clientesPorMunicipio : [reset($clientesPorMunicipio)];
            return $el;
        }, $datosAgrupadosPorMunicipios);
    }


    public function reporteExcelDetalladoTodo()
    {
        $reporteVencidos = $this->getDatosReporte();
        
        $spreadsheet = new Spreadsheet();
        $activeWorksheet = $spreadsheet->getActiveSheet();

        //Header del Excel
        $activeWorksheet->setCellValue('A5', 'Municipio');
        $activeWorksheet->setCellValue('B5', 'Acreditada');
        $activeWorksheet->setCellValue('C5', 'Abonos');
        $activeWorksheet->setCellValue('D5', 'Monto total');
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(30);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(50);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(20);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(20);

        $cellY = 2;
        //Renderizado de los datos del query a celdas
        foreach($reporteVencidos as $datos) {

            $activeWorksheet->setCellValue('A' . $cellY, $datos->municipio);
            $activeWorksheet->setCellValue('C' . $cellY, $datos->abonos);
            $activeWorksheet->setCellValue('D' . $cellY, $datos->montos);

            if(count($datos->clientes) > 0) 
                $cellY++;

            foreach($datos->clientes as $cliente) {
                $activeWorksheet->setCellValue('B' . $cellY, $cliente->cliente);
                $activeWorksheet->setCellValue('C' . $cellY, $cliente->abonos);
                $activeWorksheet->setCellValue('D' . $cellY, $cliente->montos);
                $cellY++;
            }
            
            if(count($datos->clientes) == 0) 
                $cellY++;
        }
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="Periodos_4_2022.xlsx"');
        header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        file_put_contents('depuracionverperiodos.txt', ob_get_contents());
        ob_end_clean(); 
        
        $writer->save("php://output");
    }

    
    public function reporteExcel()
    {
        $reporteVencidos = $this->getDatosReporte();
        
        $spreadsheet = new Spreadsheet();
        $activeWorksheet = $spreadsheet->getActiveSheet();

        //Header del Excel
        $activeWorksheet->setCellValue('A1', 'Municipio');
        $activeWorksheet->setCellValue('B1', 'Abonos');
        $activeWorksheet->setCellValue('C1', 'Monto total');
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(30);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(20);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(20);

        $cellY = 2;
        //Renderizado de los datos del query a celdas
        foreach ($reporteVencidos as $datos) {
            $activeWorksheet->setCellValue('A' . $cellY, $datos->municipio);
            $activeWorksheet->setCellValue('B' . $cellY, $datos->abonos);
            $activeWorksheet->setCellValue('C' . $cellY, $datos->montos);
            
            $cellY++;
        }
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="Cartera Vencida Municipios.xlsx"');
        header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        file_put_contents('depuracionverperiodos.txt', ob_get_contents());
        ob_end_clean();
        
        $writer->save("php://output");
    }

    public function reporteExcelIdMunicipio($idMunicipio) 
    {
        $reporteVencidos = $this->getDatosReportePorMunicipio($idMunicipio);
        
        $spreadsheet = new Spreadsheet();
        $activeWorksheet = $spreadsheet->getActiveSheet();

        //Header del Excel
        $activeWorksheet->setCellValue('A1', 'Municipio');
        $activeWorksheet->setCellValue('B1', 'Acreditada');
        $activeWorksheet->setCellValue('C1', 'Grupo');
        $activeWorksheet->setCellValue('D1', 'Fecha vencida');
        $activeWorksheet->setCellValue('E1', 'Abonos');
        $activeWorksheet->setCellValue('F1', 'Monto total');
        $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(30);
        $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(50);
        $spreadsheet->getActiveSheet()->getColumnDimension('C')->setWidth(20);
        $spreadsheet->getActiveSheet()->getColumnDimension('D')->setWidth(20);

        $cellY = 2;
        $municipioNombre = '';
        //Renderizado de los datos del query a celdas
        foreach($reporteVencidos as $datos) {
            $municipioNombre = $datos->municipio;

            $activeWorksheet->setCellValue('A' . $cellY, $datos->municipio);
            $activeWorksheet->setCellValue('E' . $cellY, $datos->abonos);
            $activeWorksheet->setCellValue('F' . $cellY, $datos->montos);

            if(count($datos->clientes) > 0) 
                $cellY++;

            foreach($datos->clientes as $cliente) {
                $activeWorksheet->setCellValue('B' . $cellY, $cliente->cliente);
                $activeWorksheet->setCellValue('C' . $cellY, $cliente->grupo);
                $activeWorksheet->setCellValue('D' . $cellY, $cliente->fechaSemana);
                $activeWorksheet->setCellValue('E' . $cellY, $cliente->abonos);
                $activeWorksheet->setCellValue('F' . $cellY, $cliente->montos);
                $cellY++;
            }
            
            if(count($datos->clientes) == 0) 
                $cellY++;
        }
        
        // header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // header("Content-Disposition: attachment;filename='Cartera vencida de $municipioNombre.xlsx'");
        // header('Cache-Control: max-age=0');
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        // file_put_contents('depuracionverperiodos.txt', ob_get_contents());
        // ob_end_clean(); 
        
        $writer->save("php://output");
    }
}
