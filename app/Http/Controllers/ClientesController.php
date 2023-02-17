<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
//use App\Models\Grupos;

class ClientesController extends Controller
{
    //
    public function listGrupos(){
        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->orderBy('grupo.created_at')
        ->get();

        return response()->json([
            'grupos' => $listGrupos
        ]);
    }

    public function createClientes(Request $request){
        $validation = $request->validate([
            'nombre' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'curp' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'required|string',
            'municipio' => 'required|string',
            'garantia' => 'required|string',
            'plazos' => 'required|string',
            'monto' => 'required|string',

            'nombre_aval' => 'required|string',
            'apellido_paterno_aval' => 'required|string',
            'apellido_materno_aval' => 'required|string',
            'curp_aval' => 'required|string',
            'telefono_aval' => 'required|string',
            'celular_aval' => 'required|string',
            'municipio_aval' => 'required|string',
            'garantia_aval' => 'required|string'
        ]);

        $cliente = new Cliente();
        $cliente->nombre = $request->nombre;
        $cliente->apellido_paternos = $request->apellido_paterno;
        $cliente->apellido_materno = $request->apellido_materno;
        $cliente->curp = $request->curp;
        $cliente->telefono = $request->telefono; 
        $cliente->celular = $request->celular;
        $cliente->estado = $request->estado;
        $cliente->municipio = $request->municipio;
        $cliente->referencias = $request->referencias;
        $cliente->garantia = $request->garantia;
        $cliente->plazos = $request->plazos; 
        $cliente->monto = $request->monto;
        $cliente->fecha_alta = $request->fecha_alta;
        $cliente->save();

    }
}
