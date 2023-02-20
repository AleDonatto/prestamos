<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;

class FormatosController extends Controller
{
    //
    public function formatoCobros(){
        $listClientes = DB::table('clientes')
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->join('avales', 'clientes.idCliente' , '=', 'avales.cliente_id')
        ->join('creditos', 'clientes.idCliente' , '=', 'creditos.cliente_id')
        ->select('clientes.*', 'grupos.nombreGrupo', 'creditos.idCredito', 
            'avales.nombre as nombre_aval', 
            'avales.municipio as municipio_aval',
            'avales.poblado as poblado_aval',
            'avales.calle as calle_aval',
            'avales.garantias as garantias_aval',
            'avales.telefono as telefono_aval',
        )
        ->orderBy('clientes.created_at')
        ->get();

        $data = [
            'title' => 'Welcome to Test',
            'date' => date('m/d/Y'),
            'clientes' => $listClientes
        ]; 

        $pdf = PDF::loadView('/formatos/Cobros', $data);
        $pdf->setPaper('A4', 'landscape');
        $pdf->setOption(['dpi' => 100, 'defaultFont' => 'sans-serif']);
     
        //return $pdf->download('itsolutionstuff.pdf');
        return $pdf->stream('itsolutionstuff.pdf');
    }
}
