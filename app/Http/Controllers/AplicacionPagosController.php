<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Inertia\Inertia;
use App\Models\Cliente;
use App\Models\AplicacionPagos;

class AplicacionPagosController extends Controller
{
    public function store(Request $request){
        $pagos    = $request->pagos;
        $clientes = $request->clientes;

        $AplicacionPagos = new AplicacionPagos();

        foreach($clientes as $cliente) {
            for($i = 1 ; $i <= $pagos ; $i++){
                $AplicacionPagos->monto = $cliente->pagoRegular;
                $AplicacionPagos->cliente_id = $cliente->idCliente;
                $AplicacionPagos->save();
            }
        }

    }

}
