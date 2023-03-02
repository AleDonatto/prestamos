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

    public function index() {
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
            'creditos.cliente_id as idCliente'

        ])
        ->join('clientes', 'clientes.idCliente', '=', 'creditos.cliente_id')
        ->orderBy('creditos.created_at')
        ->get();

        return response()->json([
            'datos' => $credito
        ]);
    }
}
