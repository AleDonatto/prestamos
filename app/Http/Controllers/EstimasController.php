<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Estimas;
use App\Models\EstimasResultados;
use Illuminate\Http\Response;

class EstimasController extends Controller
{
    
    public function viewGetEstima($id, $dia) {
        $estimaData = array(
            'idEstima' => $id,
                'dia' => $dia
        );
        return Inertia::render('EstimacionMunicipioPorDia', [
            'datosEstimas' => $estimaData            
        ]);
    }

    public function getEstimas(Request $request) {
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $estimasDias = [];
        $idEstima = null;
        $hayEstimas = false;

        $estimas = DB::table("estimas")->where('fechaInicio', $fechaInicio)->where('fechaFinal', $fechaFin)->get();

        if($estimas->count() > 0) {
            $estimasDias = $this->getEstimasDeSemana($estimas[0]->id);
            $idEstima = $estimas[0]->id;
            $hayEstimas = true;
            
        }

        return response()->json([
            'idEstima' => $idEstima,
            'estimaData' => $estimas,
            'estimasDias' => $estimasDias,
            'hayEstimaRegistrada' => $hayEstimas,
        ]);
    }

    public function generarEstimas( Request $request ) {
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $idEstimas = null;

        $estimasCount = Estimas::select('id')->where('fechaInicio', $fechaInicio)->where('fechaFinal', $fechaFin)->get();

        if(count($estimasCount) == 0) {
            $estimas = new Estimas();
            $estimas->fechaInicio = $fechaInicio;
            $estimas->fechaFinal = $fechaFin;
            $estimas->save();
            $idEstimas = $estimas->id;
        } else {
            $idEstimas = $estimasCount[0]->id;
        }

        
        return response()->json([
            'status' => true,
            'idEstimas' => $idEstimas
        ]);
    }

    public function getEstimasDeSemana($idEstimas) {
        $datosLunes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'lunes')->get();
        $datosMartes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'martes')->get();
        $datosMiercoles = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'miercoles')->get();
        $datosJueves = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'jueves')->get();
        $datosViernes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'viernes')->get();

        return [
            'lunes' => $datosLunes,
            'martes' => $datosMartes,
            'miercoles' => $datosMiercoles,
            'jueves' => $datosJueves,
            'viernes' => $datosViernes,
        ];
    }

    public function getEstimasDeSemanaPorDia( Request $request ) {
        $idEstima = $request->idEstima;
        $dia = $request->dia;
        $datos = EstimasResultados::where('idEstimaSemana', $idEstima)->where('dia', $dia)->get();

        return [
            'datos' => $datos,
        ];
    }

    public function guardarResultadoEstimas( Request $request ){
        $exists = EstimasResultados::where('idEstimaSemana', $request->idEstima)->where('idMunicipio', $request->idMunicipio)->where('dia', $request->dia)->get();
        $res = [
            'msg' => "El municipio ya ha sido registrada en la estima de este dia",
            'status' => false,
        ];

        if($exists->count() == 0) {
            $estima = new EstimasResultados();
            $estima->dia = $request->dia;
            $estima->idEstimaSemana = $request->idEstima;
            $estima->horario = '';
            $estima->idMunicipio = $request->idMunicipio;
            $estima->nPrimerPrestamo = $request->estima['nPrimerPrestamo'];
            $estima->montoPrimerPrestamo = $request->estima['montoPrimerPrestamo'];
            $estima->nSegundoPrestamo = $request->estima['nSegundoPrestamo'];
            $estima->montoSegundoPrestamo = $request->estima['montoSegundoPrestamo'];
            $estima->nTercerPrestamo = $request->estima['nTercerPrestamo'];
            $estima->montoTercerPrestamo = $request->estima['montoTercerPrestamo'];
            $estima->nCuartoPrestamo = $request->estima['nCuartoPrestamo'];
            $estima->montoCuartoPrestamo = $request->estima['montoCuartoPrestamo'];
            $estima->nQuintoPrestamo = $request->estima['nQuintoPrestamo'];
            $estima->montoQuintoPrestamo = $request->estima['montoQuintoPrestamo'];
            $estima->nSextoPrestamo = $request->estima['nSextoPrestamo'];
            $estima->montoSextoPrestamo = $request->estima['montoSextoPrestamo'];
            $estima->nSeptimoPrestamo = $request->estima['nSeptimoPrestamo'];
            $estima->montoSeptimoPrestamo = $request->estima['montoSeptimoPrestamo'];
            $estima->nOctavoPrestamo = $request->estima['nOctavoPrestamo'];
            $estima->montoOctavoPrestamo = $request->estima['montoOctavoPrestamo'];
            $estima->totalMonto = $request->estima['totalMonto'];
            $estima->totalAbonos = $request->estima['totalAbonos'];
            $estima->save();   

            $res = [
                'msg' => "Estima registrada correctamente",
                'status' => true,
            ];

        } 

        return response()->json($res);
    }

    public function deleteEstimaResultados($id) {
        EstimasResultados::where('id', $id)->delete();
    }
}
