<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use App\Models\Grupo;
use App\Models\Cliente;
use App\Models\Aval;
use App\Models\Credito;
use Inertia\Inertia;

class ClientesController extends Controller
{
    //
    public function listGrupos(){
        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->orderBy('grupos.created_at')
        ->get();

        return response()->json([
            'grupos' => $listGrupos
        ]);
    }

    public function createGrupos(Request $request){
        $validation = $request->validate([
            'nombreGrupo' => 'required|string'
        ]);

        $grupo = new Grupo();
        $grupo->nombreGrupo = $request->nombreGrupo;
        $grupo->save();

        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->orderBy('grupos.created_at')
        ->get();

        return response()->json([
            'newGrupo' => $grupo,
            'listGrupo' => $listGrupos
        ]);


    }

    public function createClientes(Request $request){
        //return $request;

        $validation = $request->validate([
            'grupo' => 'required|integer',
            'nombre' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'curp' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'required|string',
            'municipio' => 'required|string',
            'garantia' => 'required|string',
            'poblado' => 'required|string',
            'referecnias' => 'required|string',
            'fecha_acreditacion' => 'required|string',

            'nombre_aval' => 'required|string',
            'apellido_paterno_aval' => 'required|string',
            'apellido_materno_aval' => 'required|string',
            'curp_aval' => 'required|string',
            'telefono_aval' => 'required|string',
            'celular_aval' => 'required|string',
            'municipio_aval' => 'required|string',
            'poblado_aval' => 'required|string',
            'referencias_aval' => 'required|string',
            'garantia_aval' => 'required|string',

            'plazos' => 'required|integer',
            'monto' => 'required|integer',
        ]);

        $cliente = new Cliente();
        $cliente->nombre = $request->nombre;
        $cliente->apellido_paterno = $request->apellido_paterno;
        $cliente->apellido_materno = $request->apellido_materno;
        $cliente->curp = $request->curp;
        $cliente->telefono = $request->telefono; 
        $cliente->celular = $request->celular;
        $cliente->estado = $request->estado;
        $cliente->municipio = $request->municipio;
        $cliente->poblado = $request->poblado;
        $cliente->calle = $request->calle;
        $cliente->referencias = $request->referencias;
        $cliente->garantias = $request->garantia;
        //$cliente->plazos = $request->plazos; 
        //$cliente->monto = $request->monto;
        $cliente->diaAlta = $request->fecha_acreditacion;
        $cliente->grupo_id = $request->grupo;
        $cliente->save();

        $aval = new Aval();
        $aval->nombre = $request->nombre_aval;
        $aval->apellido_paterno = $request->apellido_paterno;
        $aval->apellido_materno = $request->apellido_materno;
        $aval->curp = $request->curp_aval;
        $aval->telefono = $request->telefono_aval;
        $aval->celular = $request->celular_aval;
        $aval->estado = $request->estado;
        $aval->municipio = $request->municipio_aval;
        $aval->poblado = $request->poblado_aval;
        $aval->calle = $request->calle_aval;
        $aval->referencias = $request->referencias_aval;
        $aval->garantias = $request->garantia_aval;
        $aval->cliente_id = $cliente->idCliente;
        $aval->save();

        $credito = new Credito();
        $credito->fechaAcreditacion = $request->fecha_acreditacion;
        $credito->monto = $request->monto;
        $credito->plazos = $request->plazos;
        $credito->cliente_id = $cliente->idCliente;
        $credito->save();

        return response()->json([
            'statusText' => 'Cliente Agregado'
        ]);

    }

    public function listClientes(){
        $listClientes = DB::table('clientes')
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->select('clientes.*', 'grupos.nombreGrupo')
        ->orderBy('clientes.created_at')
        ->get();

        return response()->json([
            'clientes' => $listClientes
        ]);
    }

    public function viewEditCliente($idCliente){
        $client = DB::table('clientes')
        ->select('clientes.*')
        ->where('clientes.idCliente', $idCliente)
        ->first();

        $aval = DB::table('avales')
        ->select('avales.*')
        ->where('avales.cliente_id', $idCliente)
        ->first();

        $cliente = array(
            'dataClient' => $client,
            'dataAval' => $aval
        );

        return Inertia::render('EditClientes', [
            'cliente' => $cliente
        ]);
    }

    public function updateDatosCliente(Request $request){
        $validate = $request->validate([
            'nombre' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'curp' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'required|string',
            'municipio' => 'required|string',
            'poblado' => 'required|string',
            'calle' => 'required|string',
            'referencias' => 'required|string',
            'garantia' => 'required|string',
        ]);

        $cliente = Cliente::where('idCliente', $request->idCliente)
        ->update([
            'nombre' => $request->nombre, 
            'apellido_paterno' => $request->apellido_paterno,
            'apellido_materno' => $request->apellido_materno,
            'curp' => $request->curp,
            'telefono' => $request->telefono, 
            'celular' => $request->celular,
            'municipio' => $request->municipio,
            'poblado' => $request->poblado,
            'calle' => $request->calle,
            'referencias' => $request->referencias, 
            'garantias' => $request->garantia,
        ]);

        return response()->json([
            'message' => 'Datos del cliente Actualizado',
            'updateClient' => $cliente,
        ]);
    }

    public function updateDatosAval(Request $request){
        $validate = $request->validate([
            'nombre' => 'required|string',
            'apellido_paterno' => 'required|string',
            'apellido_materno' => 'required|string',
            'curp' => 'required|string',
            'telefono' => 'required|string',
            'celular' => 'required|string',
            'municipio' => 'required|string',
            'poblado' => 'required|string',
            'calle' => 'required|string',
            'referencias' => 'required|string',
            'garantia' => 'required|string',
        ]);

        $aval = Aval::where('idAval', $request->idAval)
        ->update([
            'nombre' => $request->nombre, 
            'apellido_paterno' => $request->apellido_paterno,
            'apellido_materno' => $request->apellido_materno,
            'curp' => $request->curp,
            'telefono' => $request->telefono, 
            'celular' => $request->celular,
            'municipio' => $request->municipio,
            'poblado' => $request->poblado,
            'calle' => $request->calle,
            'referencias' => $request->referencias, 
            'garantias' => $request->garantia,
        ]);

        return response()->json([
            'message' => 'Datos del Aval Actualizado',
            'updateAval' => $aval,
        ]);
    }
}
