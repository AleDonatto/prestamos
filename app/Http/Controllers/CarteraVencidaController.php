<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Municipios;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Models\ControlPagos;

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


    public function getCarteraVencida($agrupadosPor = 'municipios', $grupo) 
    {

        $sqlAgrupar = $agrupadosPor == 'municipios' ? 'municipio.idMunicipio' : 'control.cliente_id';
        $sqlMostrar = $agrupadosPor == 'municipios' ? 'municipio.nombreMunicipio as municipio,' : "concat(cliente.nombre , ' ' , cliente.apellido_paterno , ' ', cliente.apellido_materno ) as cliente,";

        $query = DB::select("SELECT  $sqlMostrar
                count(cliente_id) as abonos,
                sum(control.monto) as montos,
                municipio.idMunicipio as idMunicipio
        FROM control_pagos control 
        INNER JOIN clientes cliente on control.cliente_id = cliente.idCliente
        INNER JOIN municipios as municipio on cliente.municipio_id = municipio.idMunicipio
        WHERE fechaPago is null AND fechaSemana < date(now())
        group by $sqlAgrupar
        ");

        return $query;
    } 

    public function reporteExcel(Request $request) // Request $request 
    {
        $grupo = 1;//$request->grupo;

        $datosAgrupadosPorMunicipios = $this->getCarteraVencida('municipios', $grupo);
        $datosAgrupadosPorClientes = $this->getCarteraVencida('clientes', $grupo);

        $res = array_map(function ($el) use ($datosAgrupadosPorClientes) {
            $clientesPorMunicipio = array_filter($datosAgrupadosPorClientes, function ($dato) use($el){
                return $dato->idMunicipio == $el->idMunicipio;
            });
            $el->clientes = $clientesPorMunicipio;
            return $el;
        }, $datosAgrupadosPorMunicipios);


        return response()->json($res);
    }
}
