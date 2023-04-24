<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Estimas;
use App\Models\EstimasResultados;
use Illuminate\Http\Response;
use PDF;

class EstimasController extends Controller
{
    private $txtMeses = [
        1 => 'Enero',
        2 => 'Febrero',
        3 => 'Marzo',
        4 => 'Abril',
        5 => 'Mayo',
        6 => 'Junio',
        7 => 'Julio',
        8 => 'Agosto',
        9 => 'Septiembre',
        10 => 'Octubre',
        11 => 'Noviembre',
        12 => 'Diciembre',
    ];
    
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
        $datosLunes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'lunes')->orderBy("horario", "asc")->get();
        $datosMartes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'martes')->orderBy("horario", "asc")->get();
        $datosMiercoles = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'miercoles')->orderBy("horario", "asc")->get();
        $datosJueves = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'jueves')->orderBy("horario", "asc")->get();
        $datosViernes = EstimasResultados::where('idEstimaSemana', $idEstimas)->where('dia', 'viernes')->orderBy("horario", "asc")->get();

        return [
            'lunes' => $datosLunes,
            'martes' => $datosMartes,
            'miercoles' => $datosMiercoles,
            'jueves' => $datosJueves,
            'viernes' => $datosViernes,
        ];
    }

    public function getEstimasDeSemanaTotales($idEstimas) {
        $datosLunes = DB::table('estimas_resultados')->select([
            DB::raw("sum(nPrimerPrestamo) as nPrimerPrestamo"),
            DB::raw("sum(montoPrimerPrestamo) as montoPrimerPrestamo"),
            DB::raw("sum(nSegundoPrestamo) as nSegundoPrestamo"),
            DB::raw("sum(montoSegundoPrestamo) as montoSegundoPrestamo"),
            DB::raw("sum(nTercerPrestamo) as nTercerPrestamo"),
            DB::raw("sum(montoTercerPrestamo) as montoTercerPrestamo"),
            DB::raw("sum(nCuartoPrestamo) as nCuartoPrestamo"),
            DB::raw("sum(montoCuartoPrestamo) as montoCuartoPrestamo"),
            DB::raw("sum(nQuintoPrestamo) as nQuintoPrestamo"),
            DB::raw("sum(montoQuintoPrestamo) as montoQuintoPrestamo"),
            DB::raw("sum(nSextoPrestamo) as nSextoPrestamo"),
            DB::raw("sum(montoSextoPrestamo) as montoSextoPrestamo"),
            DB::raw("sum(nSeptimoPrestamo) as nSeptimoPrestamo"),
            DB::raw("sum(montoSeptimoPrestamo) as montoSeptimoPrestamo"),
            DB::raw("sum(nOctavoPrestamo) as nOctavoPrestamo"),
            DB::raw("sum(montoOctavoPrestamo) as montoOctavoPrestamo"),
            DB::raw("sum(totalMonto) as totalMonto"),
            DB::raw("sum(totalAbonos) as totalAbonos"),
        ])
        ->where('idEstimaSemana', $idEstimas)->where('dia', 'lunes')->orderBy("horario", "asc")->get();
        $datosMartes = DB::table('estimas_resultados')->select([
            DB::raw("sum(nPrimerPrestamo) as nPrimerPrestamo"),
            DB::raw("sum(montoPrimerPrestamo) as montoPrimerPrestamo"),
            DB::raw("sum(nSegundoPrestamo) as nSegundoPrestamo"),
            DB::raw("sum(montoSegundoPrestamo) as montoSegundoPrestamo"),
            DB::raw("sum(nTercerPrestamo) as nTercerPrestamo"),
            DB::raw("sum(montoTercerPrestamo) as montoTercerPrestamo"),
            DB::raw("sum(nCuartoPrestamo) as nCuartoPrestamo"),
            DB::raw("sum(montoCuartoPrestamo) as montoCuartoPrestamo"),
            DB::raw("sum(nQuintoPrestamo) as nQuintoPrestamo"),
            DB::raw("sum(montoQuintoPrestamo) as montoQuintoPrestamo"),
            DB::raw("sum(nSextoPrestamo) as nSextoPrestamo"),
            DB::raw("sum(montoSextoPrestamo) as montoSextoPrestamo"),
            DB::raw("sum(nSeptimoPrestamo) as nSeptimoPrestamo"),
            DB::raw("sum(montoSeptimoPrestamo) as montoSeptimoPrestamo"),
            DB::raw("sum(nOctavoPrestamo) as nOctavoPrestamo"),
            DB::raw("sum(montoOctavoPrestamo) as montoOctavoPrestamo"),
            DB::raw("sum(totalMonto) as totalMonto"),
            DB::raw("sum(totalAbonos) as totalAbonos"),
        ])
        ->where('idEstimaSemana', $idEstimas)->where('dia', 'martes')->orderBy("horario", "asc")->get();
        $datosMiercoles = DB::table('estimas_resultados')->select([
            DB::raw("sum(nPrimerPrestamo) as nPrimerPrestamo"),
            DB::raw("sum(montoPrimerPrestamo) as montoPrimerPrestamo"),
            DB::raw("sum(nSegundoPrestamo) as nSegundoPrestamo"),
            DB::raw("sum(montoSegundoPrestamo) as montoSegundoPrestamo"),
            DB::raw("sum(nTercerPrestamo) as nTercerPrestamo"),
            DB::raw("sum(montoTercerPrestamo) as montoTercerPrestamo"),
            DB::raw("sum(nCuartoPrestamo) as nCuartoPrestamo"),
            DB::raw("sum(montoCuartoPrestamo) as montoCuartoPrestamo"),
            DB::raw("sum(nQuintoPrestamo) as nQuintoPrestamo"),
            DB::raw("sum(montoQuintoPrestamo) as montoQuintoPrestamo"),
            DB::raw("sum(nSextoPrestamo) as nSextoPrestamo"),
            DB::raw("sum(montoSextoPrestamo) as montoSextoPrestamo"),
            DB::raw("sum(nSeptimoPrestamo) as nSeptimoPrestamo"),
            DB::raw("sum(montoSeptimoPrestamo) as montoSeptimoPrestamo"),
            DB::raw("sum(nOctavoPrestamo) as nOctavoPrestamo"),
            DB::raw("sum(montoOctavoPrestamo) as montoOctavoPrestamo"),
            DB::raw("sum(totalMonto) as totalMonto"),
            DB::raw("sum(totalAbonos) as totalAbonos"),
        ])
        ->where('idEstimaSemana', $idEstimas)->where('dia', 'miercoles')->orderBy("horario", "asc")->get();
        $datosJueves = DB::table('estimas_resultados')->select([
            DB::raw("sum(nPrimerPrestamo) as nPrimerPrestamo"),
            DB::raw("sum(montoPrimerPrestamo) as montoPrimerPrestamo"),
            DB::raw("sum(nSegundoPrestamo) as nSegundoPrestamo"),
            DB::raw("sum(montoSegundoPrestamo) as montoSegundoPrestamo"),
            DB::raw("sum(nTercerPrestamo) as nTercerPrestamo"),
            DB::raw("sum(montoTercerPrestamo) as montoTercerPrestamo"),
            DB::raw("sum(nCuartoPrestamo) as nCuartoPrestamo"),
            DB::raw("sum(montoCuartoPrestamo) as montoCuartoPrestamo"),
            DB::raw("sum(nQuintoPrestamo) as nQuintoPrestamo"),
            DB::raw("sum(montoQuintoPrestamo) as montoQuintoPrestamo"),
            DB::raw("sum(nSextoPrestamo) as nSextoPrestamo"),
            DB::raw("sum(montoSextoPrestamo) as montoSextoPrestamo"),
            DB::raw("sum(nSeptimoPrestamo) as nSeptimoPrestamo"),
            DB::raw("sum(montoSeptimoPrestamo) as montoSeptimoPrestamo"),
            DB::raw("sum(nOctavoPrestamo) as nOctavoPrestamo"),
            DB::raw("sum(montoOctavoPrestamo) as montoOctavoPrestamo"),
            DB::raw("sum(totalMonto) as totalMonto"),
            DB::raw("sum(totalAbonos) as totalAbonos"),
        ])
        ->where('idEstimaSemana', $idEstimas)->where('dia', 'jueves')->orderBy("horario", "asc")->get();
        $datosViernes = DB::table('estimas_resultados')->select([
            DB::raw("sum(nPrimerPrestamo) as nPrimerPrestamo"),
            DB::raw("sum(montoPrimerPrestamo) as montoPrimerPrestamo"),
            DB::raw("sum(nSegundoPrestamo) as nSegundoPrestamo"),
            DB::raw("sum(montoSegundoPrestamo) as montoSegundoPrestamo"),
            DB::raw("sum(nTercerPrestamo) as nTercerPrestamo"),
            DB::raw("sum(montoTercerPrestamo) as montoTercerPrestamo"),
            DB::raw("sum(nCuartoPrestamo) as nCuartoPrestamo"),
            DB::raw("sum(montoCuartoPrestamo) as montoCuartoPrestamo"),
            DB::raw("sum(nQuintoPrestamo) as nQuintoPrestamo"),
            DB::raw("sum(montoQuintoPrestamo) as montoQuintoPrestamo"),
            DB::raw("sum(nSextoPrestamo) as nSextoPrestamo"),
            DB::raw("sum(montoSextoPrestamo) as montoSextoPrestamo"),
            DB::raw("sum(nSeptimoPrestamo) as nSeptimoPrestamo"),
            DB::raw("sum(montoSeptimoPrestamo) as montoSeptimoPrestamo"),
            DB::raw("sum(nOctavoPrestamo) as nOctavoPrestamo"),
            DB::raw("sum(montoOctavoPrestamo) as montoOctavoPrestamo"),
            DB::raw("sum(totalMonto) as totalMonto"),
            DB::raw("sum(totalAbonos) as totalAbonos"),
        ])
        ->where('idEstimaSemana', $idEstimas)->where('dia', 'viernes')->orderBy("horario", "asc")->get();

        return [
            'lunes' => $datosLunes[0],
            'martes' => $datosMartes[0],
            'miercoles' => $datosMiercoles[0],
            'jueves' => $datosJueves[0],
            'viernes' => $datosViernes[0],
        ];
    }

    public function getEstimasDeSemanaPorDia( Request $request ) {
        $idEstima = $request->idEstima;
        $dia = $request->dia;
        $datos = EstimasResultados::where('idEstimaSemana', $idEstima)->orderBy("horario", "asc")->where('dia', $dia)->get();

        return [
            'datos' => $datos,
        ];
    }

    public function guardarResultadoEstimas( Request $request ){
        $exists = EstimasResultados::where('idEstimaSemana', $request->idEstima)
                                   ->where('idMunicipio', $request->idMunicipio)
                                   ->get();
        $res = [
            'msg' => "El municipio ya ha sido registrada en la estima de la semana",
            'status' => false,
        ];

        if ($exists->count() == 0) {
            $estima = new EstimasResultados();
            $estima->dia = $request->dia;
            $estima->idEstimaSemana = $request->idEstima;
            $estima->horario = isset($request->estima['horario']) ? $request->estima['horario'] : '';
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

    public function editarResultadoEstimas( Request $request ){
        
        $res = [
            'msg' => "El municipio ya ha sido registrada en la estima de la semana",
            'status' => false,
        ];
        $estimaRecord = $request->estima;
        $estima = EstimasResultados::find($estimaRecord['id']);
        
        if ($estima->count() > 0) {
            $estima->dia = $request->dia;
            $estima->idEstimaSemana = $request->idEstima;
            $estima->horario = isset($estimaRecord['horario']) ? $estimaRecord['horario'] : '';
            $estima->idMunicipio = $estimaRecord['idMunicipio'];
            $estima->nPrimerPrestamo = $estimaRecord['nPrimerPrestamo'];
            $estima->montoPrimerPrestamo = $estimaRecord['montoPrimerPrestamo'];
            $estima->nSegundoPrestamo = $estimaRecord['nSegundoPrestamo'];
            $estima->montoSegundoPrestamo = $estimaRecord['montoSegundoPrestamo'];
            $estima->nTercerPrestamo = $estimaRecord['nTercerPrestamo'];
            $estima->montoTercerPrestamo = $estimaRecord['montoTercerPrestamo'];
            $estima->nCuartoPrestamo = $estimaRecord['nCuartoPrestamo'];
            $estima->montoCuartoPrestamo = $estimaRecord['montoCuartoPrestamo'];
            $estima->nQuintoPrestamo = $estimaRecord['nQuintoPrestamo'];
            $estima->montoQuintoPrestamo = $estimaRecord['montoQuintoPrestamo'];
            $estima->nSextoPrestamo = $estimaRecord['nSextoPrestamo'];
            $estima->montoSextoPrestamo = $estimaRecord['montoSextoPrestamo'];
            $estima->nSeptimoPrestamo = $estimaRecord['nSeptimoPrestamo'];
            $estima->montoSeptimoPrestamo = $estimaRecord['montoSeptimoPrestamo'];
            $estima->nOctavoPrestamo = $estimaRecord['nOctavoPrestamo'];
            $estima->montoOctavoPrestamo = $estimaRecord['montoOctavoPrestamo'];
            $estima->totalMonto = $estimaRecord['totalMonto'];
            $estima->totalAbonos = $estimaRecord['totalAbonos'];
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

    public function generarEstimaPDF( Request $request ) {
        $idEstima = $request->idEstima;
        $datos = $this->getEstimasDeSemana($idEstima);
        $estimas = Estimas::select(['fechaInicio', 'fechaFinal'])->where('id', $idEstima)->get();
        $txtFechasEstimas = '';
        if(count($estimas) > 0) {
            $fechaInicio = $estimas[0]->fechaInicio;
            $fechaInicioPartes = date_parse_from_format('Y-m-d', $fechaInicio);
            $diaFechaInicio = $fechaInicioPartes['day'];
            $anioFechaInicio = $fechaInicioPartes['year'];
            $mesFechaInicio = strtoupper($this->txtMeses[$fechaInicioPartes['month']]);


            $fechaFinal = $estimas[0]->fechaFinal;
            $fechaFinalPartes = date_parse_from_format('Y-m-d', $fechaFinal);
            $diaFechaFinal = $fechaFinalPartes['day'];
            $mesFechaFinal = strtoupper($this->txtMeses[$fechaFinalPartes['month']]);

            $txtFechasEstimas = 'DE '.  $diaFechaInicio . ' DE ' .$mesFechaInicio  .' AL '. $diaFechaFinal .' DE '. $mesFechaFinal .' DEL ' . $anioFechaInicio;
        }

        $totales = $this->getEstimasDeSemanaTotales($idEstima);
        var_dump($totales['lunes']);

        $pdf = PDF::loadView('/formatos/Estimas', [
            'datos' => $datos, 
            'txtFechasEstimas' => $txtFechasEstimas,
            'totales' => $totales
        ]);
        $pdf->setPaper('a4');
        $pdf->setOption(['dpi' => 100, 'defaultFont' => 'roboto']);

        return $pdf->stream('Estimas.pdf');
    }
    
}
