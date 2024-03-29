<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Inertia;
use App\Models\AplicacionPagos;
use PDF;
class AplicacionPagosController extends Controller
{
    public function store(Request $request){
        $pagos    = $request->pagos;
        $clientes = $request->clientes;

        foreach($clientes as $cliente) {
            for($i = 1 ; $i <= $pagos ; $i++){
                $AplicacionPagos = new AplicacionPagos();
                $AplicacionPagos->monto = $cliente['pagoRegular'];
                $AplicacionPagos->cliente_id = $cliente['idCliente'];
                $AplicacionPagos->save();
            }
        }
    }


    public function getPagos(Request $request){
        $cliente = $request->cliente;
        $order   = $request->order ?? 'desc';

        $pagos = AplicacionPagos::where('cliente_id', $cliente)
        ->select([
            "id",
            DB::raw("date(created_at) as fechaPago")
        ])
        ->orderBy('created_at', $order)
        ->get();

        return response()->json([
            'status' => true,
            'datos' => $pagos,
        ]);
    }

    
    public function delete(Request $request){
        $pago_id = $request->id;

        $pagos = AplicacionPagos::where('id', $pago_id)->delete();

        return response()->json([
            'status' => true,
        ]);
    }

    public function reportePdfVista1(Request $request){
        $datos = $request->datos;
        $pdf = PDF::loadView('/formatos/AplicacionPagos', ['datos' => $datos]);
        $pdf->setPaper('a4', 'landscape');
        $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);

        return $pdf->stream('listAplicacionPagos.pdf');
    }

}
