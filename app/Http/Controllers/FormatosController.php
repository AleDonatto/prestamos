<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PDF;

class FormatosController extends Controller
{
    //
    public function formatoCobros(Request $request){

        if($request->grupo >= 1 && $request->municipio == 0){

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->join('avales', 'clientes.idCliente' , '=', 'avales.cliente_id')
            //->join('avales', 'avales.municipio_id', '=', 'municipios,idMunicipio')
            ->join('creditos', 'clientes.idCliente' , '=', 'creditos.cliente_id')
            ->select('clientes.*','municipios.nombreMunicipio', 'grupos.nombreGrupo','grupos.idGrupo', 'creditos.idCredito', 
                'avales.nombre as nombre_aval', 
                'avales.apellido_paterno as apellido_paterno_aval', 
                'avales.apellido_materno as apellido_materno_aval', 
                'avales.poblado as poblado_aval',
                'avales.calle as calle_aval',
                'avales.garantias as garantias_aval',
                'avales.celular as telefono_aval',
                'avales.referencias as referencias_aval'
            )
            //->select('avles.*', 'municipios.nombreMunicipio')
            ->where('grupos.idGrupo', $request->grupo)
            ->orderBy('clientes.created_at')
            ->get();

            $data = [
                'title' => 'Welcome to Test',
                'date' => date('m/d/Y'),
                'clientes' => $listClientes,
                'nClientes' => count($listClientes)
            ]; 
    
            $pdf = PDF::loadView('/formatos/Cobros', $data);
            $pdf->setPaper('a4', 'landscape');
            $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);

            return $pdf->stream('listclients.pdf');
        }else if($request->grupo == 0 && $request->municipio >= 1){

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->join('avales', 'clientes.idCliente' , '=', 'avales.cliente_id')
            ->join('creditos', 'clientes.idCliente' , '=', 'creditos.cliente_id')
            ->select('clientes.*','municipios.nombreMunicipio', 'grupos.nombreGrupo','grupos.idGrupo', 'creditos.idCredito', 
                'avales.nombre as nombre_aval', 
                'avales.apellido_paterno as apellido_paterno_aval', 
                'avales.apellido_materno as apellido_materno_aval', 
                'avales.poblado as poblado_aval',
                'avales.calle as calle_aval',
                'avales.garantias as garantias_aval',
                'avales.celular as telefono_aval',
                'avales.referencias as referencias_aval'
            )
            ->where('municipios.idMunicipio', $request->municipio)
            ->orderBy('clientes.created_at')
            ->get();

            $data = [
                'title' => 'Welcome to Test',
                'date' => date('m/d/Y'),
                'clientes' => $listClientes,
                'nClientes' => count($listClientes)
            ]; 

            $pdf = PDF::loadView('/formatos/Cobros', $data);
            $pdf->setPaper('a4', 'landscape');
            $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);

            return $pdf->stream('listclients.pdf');
        }else if($request->municipio >= 1 && $request->grupo >= 0){

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->join('avales', 'clientes.idCliente' , '=', 'avales.cliente_id')
            ->join('creditos', 'clientes.idCliente' , '=', 'creditos.cliente_id')
            ->select('clientes.*','municipios.nombreMunicipio', 'grupos.nombreGrupo','grupos.idGrupo', 'creditos.idCredito', 
                'avales.nombre as nombre_aval', 
                'avales.apellido_paterno as apellido_paterno_aval', 
                'avales.apellido_materno as apellido_materno_aval', 
                'avales.poblado as poblado_aval',
                'avales.calle as calle_aval',
                'avales.garantias as garantias_aval',
                'avales.celular as telefono_aval',
                'avales.referencias as referencias_aval'
            )
            ->where('grupos.idGrupo', $request->grupo)
            ->where('municipios.idMunicipio', $request->municipio)
            ->orderBy('clientes.created_at')
            ->get();

            $data = [
                'title' => 'Welcome to Test',
                'date' => date('m/d/Y'),
                'clientes' => $listClientes,
                'nClientes' => count($listClientes)
            ]; 

            $pdf = PDF::loadView('/formatos/Cobros', $data);
            $pdf->setPaper('a4', 'landscape');
            $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);
        
            //return $pdf->download('itsolutionstuff.pdf');
            return $pdf->stream('listclients.pdf');
        }else {

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->join('avales', 'clientes.idCliente' , '=', 'avales.cliente_id')
            ->join('creditos', 'clientes.idCliente' , '=', 'creditos.cliente_id')
            ->select('clientes.*','municipios.nombreMunicipio', 'grupos.nombreGrupo','grupos.idGrupo', 'creditos.idCredito', 
                'avales.nombre as nombre_aval', 
                'avales.apellido_paterno as apellido_paterno_aval', 
                'avales.apellido_materno as apellido_materno_aval', 
                'avales.poblado as poblado_aval',
                'avales.calle as calle_aval',
                'avales.garantias as garantias_aval',
                'avales.celular as telefono_aval',
                'avales.referencias as referencias_aval'
            )
            ->orderBy('clientes.created_at')
            ->get();

            $data = [
                'title' => 'Welcome to Test',
                'date' => date('m/d/Y'),
                'clientes' => $listClientes,
                'nClientes' => count($listClientes)
            ]; 

            $pdf = PDF::loadView('/formatos/Cobros', $data);
            $pdf->setPaper('a4', 'landscape');
            $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);
        
            //return $pdf->download('itsolutionstuff.pdf');
            return $pdf->stream('listclients.pdf');
        }
    }
}
