<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use InertiaInertia;
use App\Models\AplicacionPagos;

class AplicacionPagosController extends Controller
{
    public function store(Request $request){
        $pagos    = $request->pagos;
        $clientes = $request->clientes;

        $insert = [];
        // $AplicacionPagos = new AplicacionPagos();

        foreach($clientes as $cliente) {
            for($i = 1 ; $i <= $pagos ; $i++){
                $insert[] = [
                    'monto' => $cliente['pagoRegular'],
                    'cliente_id' => $cliente['idCliente'],
                ];
            }
        }

        AplicacionPagos::insert($insert);
    }

}
