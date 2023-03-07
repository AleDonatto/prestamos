<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use App\Models\Grupo;
use App\Models\Cliente;
use App\Models\Aval;
use App\Models\Credito;
use Inertia\Inertia;

class CreditosController extends Controller
{

    public function index(Request $request) {
        $grupo = $request->grupo;
        $credito = DB::table('creditos')
        ->select([
            'creditos.idCredito as credito',
            'creditos.plazos as plazo',
            DB::raw(" concat((select count(aplicacion.id) from aplicacion_pagos aplicacion where aplicacion.cliente_id = clientes.idCliente ),'/',creditos.plazos) as pagos"),
            DB::raw(" (select count(aplicacion.id) from aplicacion_pagos aplicacion where aplicacion.cliente_id = clientes.idCliente ) as plazosPagados"),
            'creditos.monto as capital',
            DB::raw('(creditos.monto / creditos.plazos) as pagoRegular'),
            DB::raw("concat(clientes.nombre , ' ' , clientes.apellido_paterno , ' ', clientes.apellido_materno ) as cliente"),
            'clientes.poblado as poblados',
            'creditos.cliente_id as idCliente',
            'grupos.idGrupo as grupo_id',
            'grupos.nombreGrupo as nombreGrupo',
        ])
        ->join('clientes', 'clientes.idCliente', '=', 'creditos.cliente_id')
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->whereRaw('clientes.id_anterior is null')
        ->whereRaw(" if($grupo <> 0 , grupos.idGrupo = '$grupo', true) ")
        ->orderBy('creditos.created_at')->get();

        return response()->json([
            'datos' => $credito
        ]);
    }
}
