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
}
