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
    
    public function listGrupos(){
        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->orderBy('grupos.created_at')
        ->get();

        return response()->json([
            'grupos' => $listGrupos
        ]);
    }

    public function showGrupo($nombre){
        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->orderBy('grupos.created_at')
        ->where('grupos.nombreGrupo', $nombre)
        ->get();

        return response()->json([
            'grupo' => $listGrupos,
            'exist' => count($listGrupos) > 0 
        ]);
    }

    public function renovarCliente(Request $request) {
        DB::beginTransaction();

        try {
            $clienteRequest = $request->client;
            $avalRequest    = $request->aval;
            $grupoSeleccionado = Grupo::where('idGrupo', $request->grupoNuevo)->get();

            if(count($grupoSeleccionado) > 0){
                return response()->json([
                    'status' => false,
                    'msg' => 'Error: el grupo ya existe',
                ]);
            }
            
            $grupo = new Grupo();
            $grupo->idGrupo = $request->grupoNuevo;
            $grupo->nombreGrupo = $request->grupoNuevo;
            $grupo->save();  

            $cliente = new Cliente();
            $cliente->nombre = $clienteRequest['nombre'];
            $cliente->apellido_paterno = $clienteRequest['apellido_paterno'];
            $cliente->apellido_materno = $clienteRequest['apellido_materno'];
            $cliente->curp = $clienteRequest['curp'];
            $cliente->telefono = 's/n'; 
            $cliente->celular = $clienteRequest['celular'];
            $cliente->estado = $clienteRequest['estado'];
            $cliente->municipio_id = $clienteRequest['municipio_id'];
            $cliente->poblado = $clienteRequest['poblado'];
            $cliente->calle = $clienteRequest['calle'];
            $cliente->referencias = $clienteRequest['referencias'];
            $cliente->garantias = isset($clienteRequest['garantia']) ? $clienteRequest['garantia'] : '';
            $cliente->diaAlta = $clienteRequest['diaAlta'];
            $cliente->grupo_id = $grupo->idGrupo;
            $cliente->save();
    
            $aval = new Aval();
            $aval->nombre = $avalRequest['nombre'];
            $aval->apellido_paterno = $avalRequest['apellido_paterno'];
            $aval->apellido_materno = $avalRequest['apellido_materno'];
            $aval->curp = $avalRequest['curp'];
            $aval->telefono = 's/n';
            $aval->celular = $avalRequest['celular'];
            $aval->estado = $avalRequest['estado'];
            $aval->municipio_id = $avalRequest['municipio_id'];
            $aval->poblado = $avalRequest['poblado'];
            $aval->calle = $avalRequest['calle'];
            $aval->referencias = $avalRequest['referencias'];
            $aval->garantias = isset($avalRequest['garantia']) ? $avalRequest['garantia'] : '';
            $aval->cliente_id = $cliente->idCliente;
            $aval->save();
            
            Cliente::where('idCliente', $clienteRequest['idCliente'])
                   ->update(['id_anterior' => $cliente->idCliente]);

            $credito = new Credito();
            $credito->fechaAcreditacion = date('Y-m-d');
            $credito->monto = $clienteRequest['monto'];
            $credito->plazos = $clienteRequest['plazos'];
            $credito->estatus = 'activo';
            $credito->cliente_id = $cliente->idCliente;
            $credito->save();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'status' => false,
                'msg' => 'Error inesperado ' . $e->getMessage(),
            ]);
        }
            
        
        return response()->json([
            'status' => true,
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
            'celular' => 'required|string',
            'municipio' => 'required|integer',
            'garantia' => 'required|string',
            'poblado' => 'required|string',
            'referencias' => 'required|string',
            'fecha_acreditacion' => 'required|string',

            'nombre_aval' => 'required|string',
            'apellido_paterno_aval' => 'required|string',
            'apellido_materno_aval' => 'required|string',
            'curp_aval' => 'required|string',
            'celular_aval' => 'required|string',
            'municipio_aval' => 'required|integer',
            'poblado_aval' => 'required|string',
            'referencias_aval' => 'required|string',
            'garantia_aval' => 'required|string',

            'plazos' => 'required|integer',
            'monto' => 'required|integer',
        ]);

        $checkCurp = DB::table('clientes')
        ->where('clientes.curp', $request->curp)
        ->count();

        $checkCurpAval = DB::table('avales')
        ->where('avales.curp', $request->curp_aval)
        ->count();

        if($checkCurp >= 1){
            return response()->json([
                'status' => 'error',
                'message' => 'Ya existe un registro del cliente que ingreso'
            ]);
        }else if($checkCurpAval >= 1){
            return response()->json([
                'status' => 'error',
                'message' => 'Ya existe un registro del aval que ingreso'
            ]);
        }else{
            $cliente = new Cliente();
            $cliente->nombre = $request->nombre;
            $cliente->apellido_paterno = $request->apellido_paterno;
            $cliente->apellido_materno = $request->apellido_materno;
            $cliente->curp = $request->curp;
            $cliente->telefono = 's/n'; 
            $cliente->celular = $request->celular;
            $cliente->estado = $request->estado;
            $cliente->municipio_id = $request->municipio;
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
            $aval->apellido_paterno = $request->apellido_paterno_aval;
            $aval->apellido_materno = $request->apellido_materno_aval;
            $aval->curp = $request->curp_aval;
            $aval->telefono = 's/n';
            $aval->celular = $request->celular_aval;
            $aval->estado = $request->estado;
            $aval->municipio_id = $request->municipio_aval;
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
            $credito->estatus = 'activo';
            $credito->cliente_id = $cliente->idCliente;
            $credito->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Cliente Agregado'
            ]);
        }

    }

    public function listClientes(){
        $listClientes = DB::table('clientes')
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
        ->select('clientes.*', 'grupos.nombreGrupo', 'municipios.nombreMunicipio', 'municipios.idMunicipio')
        ->whereRaw('clientes.id_anterior is null')
        ->orderBy('clientes.created_at')
        ->get();

        return response()->json([
            'status' => 'success',
            'clientes' => $listClientes
        ]);
    }


    public function editCliente($idCliente){
        $client = DB::table('clientes')
        ->select([
            'clientes.*',
            'clientes.garantias as garantia',
            'grupos.nombreGrupo as nombreGrupo',
            'municipios.nombreMunicipio as nombreMunicipio',
            'creditos.plazos as plazo',
        ])
        ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
        ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
        ->join('creditos', 'clientes.idCliente', '=', 'creditos.cliente_id')
        ->where('clientes.idCliente', $idCliente)
        ->first();

        $aval = DB::table('avales')
        ->select([
            'avales.*', 
            'avales.garantias as garantia',
        ])
        ->where('avales.cliente_id', $idCliente)
        ->first();

        return response()->json([
            'cliente' => $client,
            'aval' => $aval
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
            'municipio' => 'required|integer',
            'poblado' => 'required|string',
            'calle' => 'required|string',
            'referencias' => 'required|string', 
            'garantia' => 'required|string',
            'fecha_acreditacion' => 'required|date',
            'grupo' => 'required|integer'
        ]);

        $cliente = Cliente::where('idCliente', $request->idCliente)
        ->update([
            'nombre' => $request->nombre, 
            'apellido_paterno' => $request->apellido_paterno,
            'apellido_materno' => $request->apellido_materno,
            'curp' => $request->curp,
            'telefono' => $request->telefono, 
            'celular' => $request->celular,
            'municipio_id' => $request->municipio,
            'poblado' => $request->poblado,
            'calle' => $request->calle,
            'referencias' => $request->referencias, 
            'garantias' => $request->garantia,
            'diaAlta' => $request->fecha_acreditacion,
            'grupo_id' => $request->grupo,
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
            'municipio' => 'required|integer',
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
            'municipio_id' => $request->municipio,
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

    public function consDynamicClients(Request $request){
        
        if($request->grupo > 0 && $request->municipio === 0){

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->select('clientes.*', 'grupos.nombreGrupo', 'municipios.nombreMunicipio', 'municipios.idMunicipio')
            ->where('grupos.idGrupo', $request->grupo)
            ->whereRaw('clientes.id_anterior is null')
            ->orderBy('clientes.created_at')
            ->get();

            return response()->json([
                'listClients' => $listClientes
            ]);
        }else if($request->grupo === 0 && $request->municipio > 0){

            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->select('clientes.*', 'grupos.nombreGrupo', 'municipios.nombreMunicipio', 'municipios.idMunicipio')
            ->where('municipios.idMunicipio', $request->municipio)
            ->whereRaw('clientes.id_anterior is null')
            ->orderBy('clientes.created_at')
            ->get();

            return response()->json([
                'listClients' => $listClientes
            ]);
        }else if($request->grupo > 0 && $request->municipio > 0){
            $listClientes = DB::table('clientes')
            ->join('grupos', 'clientes.grupo_id', '=', 'grupos.idGrupo')
            ->join('municipios', 'clientes.municipio_id', '=', 'municipios.idMunicipio')
            ->select('clientes.*', 'grupos.nombreGrupo', 'municipios.nombreMunicipio', 'municipios.idMunicipio')
            ->where('municipios.idMunicipio', $request->municipio)
            ->where('grupos.idGrupo', $request->grupo)
            ->whereRaw('clientes.id_anterior is null')
            ->orderBy('clientes.created_at')
            ->get();

            return response()->json([
                'listClients' => $listClientes
            ]);
        }

        return response()->json([
            'message' => 'No se envio ningun parametro'
        ]);
    }
}
