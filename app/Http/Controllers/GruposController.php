<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Grupo;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class GruposController extends Controller
{
    //
    public function viewGrupos(){
        return Inertia::render('Grupos');
    }

    public function getGrupos(){
        $listGrupos = DB::table('grupos')
        ->select('grupos.*')
        ->get();

        return respos()->json([
            'listGrupos' => $listGrupos
        ]);
    }

    public function editGrupos(Request $request){

        $validation = $request->validate([
            'nombreGrupo_edit' => 'required|string'
        ]);

        $editGrupo = Grupo::where('idGrupo', $request->idGrupo)
        ->update([
            'nombreGrupo' => $request->nombreGrupo_edit
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Grupo Modificado'
        ]);
    }

    public function deleteGrupos(Request $request){
        $deleteGrupo = DB::table('grupos')
        ->where('idGrupo', $request->idGrupo)
        ->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Grupo Eliminado'
        ]);
    }
}
