<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Credito;
use App\Models\ControlPagos;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class ControlPagoController extends Controller
{
    public $translateDay = [
        "Monday" => "Lunes",
        "Tuesday" => "Martes",
        "Wednesday" => "Miercoles",
        "Thursday" => "Jueves",
        "Friday" => "Viernes",
        "Saturday" => "Sabado",
        "Sunday" => "Domingo",
    ];

    public function generacion($idCliente) 
    {
        $res = $this->generacionScript($idCliente);

        return response()->json($res);
    }

    public function generacionScript($idCliente) 
    {
    
        $cliente = DB::table('clientes')
        ->select([
            "clientes.diaAlta as fechaAlta",
            "clientes.idCliente",
            "creditos.plazos",
            "creditos.idCredito",
            "creditos.monto",
            DB::raw("(creditos.monto * 0.10) as montoSemanal"),
        ])
        ->join('creditos','clientes.idCliente','=','creditos.cliente_id')
        ->where('idCliente', $idCliente)
        ->get();
        
        ControlPagos::where('cliente_id', $idCliente)->delete();
        if(count($cliente) > 0){
            $cliente = $cliente[0];
            $fechaAlta = $cliente->fechaAlta;
            $plazos = $cliente->plazos;
            $montoSemanal = $cliente->montoSemanal;
            $semana = 1;
            
            $datos = [];
            while($semana <= $plazos){
                $fechaSemana = date('Y-m-d', strtotime($fechaAlta . "+$semana weeks"));
                $nWeek = date('l', strtotime($fechaSemana));
                $nombreDiaSemana = $this->translateDay[$nWeek];
                
                $data = [
                    'monto' => $montoSemanal, 
                    'diaSemana' => $nombreDiaSemana, 
                    'semana' => $semana, 
                    'cliente_id' => $idCliente, 
                    'credito_id' => $cliente->idCredito, 
                    'fechaSemana' => $fechaSemana, 
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                $semana++;
                array_push($datos, $data);
            }
            ControlPagos::insert($datos);
        }

        return [
            'status' => true,
            'idCliente' => $idCliente,
            'datos' => $datos,
            'msg' => 'Datos de pagos registrados correctamente',
        ];

    }

    public function generacionTodosClientes() 
    {
        $clientes = DB::table('clientes')
        ->select("clientes.idCliente")
        ->get();

        $res = [];
        foreach( $clientes as $cliente) {
            array_push($res, $this->generacionScript($cliente->idCliente));
        }

        return response()->json($res);
    }


    public function controlPorCliente($idCliente) 
    {
        $controlPagos = ControlPagos::where('cliente_id', $idCliente)->get();

        return response()->json($controlPagos);
    }

    public function eliminarPago($id) {
        ControlPagos::where('id', $id)->update([
            'fechaPago' => null
        ]);
    }

    public function realizarPago(Request $request) {
        $numeroPagos = $request->pagos;
        $idsCliente = $request->clientes; 
        
        foreach($idsCliente as $idCliente) {
            $pagosControl = ControlPagos::where('cliente_id', $idCliente)
                                        ->where('fechaPago', null)
                                        ->orderBy('id', 'ASC')
                                        ->limit($numeroPagos)
                                        ->get();
            
            foreach($pagosControl as $pagoControl) {
                ControlPagos::where('id', $pagoControl->id)->update([
                    'fechaPago' => now()
                ]);
            }
        }
        
    }

    public function index(Request $request) {
        $grupo = $request->grupo;
        $cliente = trim($request->cliente);
        $municipio = $request->municipio;
        $mostrarCarteraFinalizada = $request->mostrarCarteraFinalizada; 
        $credito = DB::table('creditos')
        ->select([
            'creditos.idCredito as credito',
            'creditos.plazos as plazo',
            DB::raw(" concat((select count(pagos.id) from control_pagos pagos where pagos.cliente_id = clientes.idCliente and fechaPago is not null ),'/',creditos.plazos) as pagos"),
            DB::raw(" (select count(pagos.id) from control_pagos pagos where pagos.cliente_id = clientes.idCliente and fechaPago is not null ) as plazosPagados"),
            'creditos.monto as capital',
            DB::raw('(creditos.monto * 0.1) as pagoRegular'),
            DB::raw("concat(clientes.nombre , ' ' , clientes.apellido_paterno , ' ', clientes.apellido_materno ) as cliente"),
            'clientes.poblado as poblados',
            'creditos.cliente_id as idCliente',
            'grupos.idGrupo as grupo_id',
            'grupos.idGrupo as nombreGrupo',
            'municipios.nombreMunicipio as nombreMunicipio',
        ])
        ->join('clientes', 'clientes.idCliente', '=', 'creditos.cliente_id')
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
        ->whereRaw('clientes.id_anterior is null')
        ->whereRaw(" if($grupo <> 0 , grupos.idGrupo = '$grupo', true) ")
        ->whereRaw(" if($municipio <> 0 , clientes.municipio_id = '$municipio', true) ");
        if($mostrarCarteraFinalizada) {
            $credito = $credito->whereRaw("creditos.plazos - 
            (select count(pagos.id) from control_pagos pagos 
                where pagos.cliente_id = clientes.idCliente AND pagos.fechaPago is not null) = 0 ");
        } else {
            $credito = $credito->whereRaw("creditos.plazos - (
                select count(pagos.id) from control_pagos pagos 
                where pagos.cliente_id = clientes.idCliente AND pagos.fechaPago is not null) > 0 ");
        }
        
        $credito = $credito->whereRaw(" if('$cliente' <> '' , concat(clientes.nombre , ' ' , clientes.apellido_paterno , ' ', clientes.apellido_materno ) like '%$cliente%', true) ")
        ->orderBy('creditos.created_at');

        return response()->json([
            'datos' => $credito->get()
        ]);
    }
}
