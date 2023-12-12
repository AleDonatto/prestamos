<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Municipios;
use Illuminate\Support\Facades\DB;

class MunicipioController extends Controller
{
    //
    public function viewMunicipios(){
        return Inertia::render('Municipios');
    }

    public function createMunicipios(Request $request){
        $validation = $request->validate([
            'nombreMunicipio' => 'required|string',
        ]);
        
        $municipios = new Municipios();
        $municipios->nombreMunicipio = $request->nombreMunicipio;
        $municipios->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Municipio agregado',
        ]);
    }

    public function listMunicipios(){
        $listMunicipio = DB::table('municipios')
        ->select('municipios.idMunicipio', 'municipios.nombreMunicipio')
        ->get();

        return response()->json([
            'listMunicipios' => $listMunicipio
        ]);
        
    }

    public function editMunicipios(Request $request){
        $validation = $request->validate([
            'nombreMunicipio_edit' => 'required|string',
        ]);

        Municipios::where('idMunicipio', $request->idMunicipio)
        ->update([
            'nombreMunicipio' => $request->nombreMunicipio_edit
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Municipio modificado',
        ]);
    }

    public function deleteMunicpio(Request $request) {
        $validation = $request->validate([
            'idMunicipio' => 'required'
        ]);

        try{
            $delete = DB::table('municipios')
            ->where('idMunicipio', '=', $request->idMunicipio)
            ->delete();

            
            return response()->json([
                'status' => 'success',
                'message' => 'Municipio eliminado con exito',
                'data'=> $delete,
            ]);

        }catch(Exception $e){

            return response()->json([
                'status' => 'error',
                'message' => 'No es posible eliminar el municipio',
                'data' => $e->getMessage()
            ]);
        }
    }
}
