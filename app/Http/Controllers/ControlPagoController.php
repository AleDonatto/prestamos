<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Credito;
use App\Models\ControlPagos;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;


class ControlPagoController extends Controller
{
    public $translateDay = [
        "Monday" => "Lunes",
        "Tuesday" => "Martes",
        "Wednesday" => "Miercoles",
        "Thursday" => "Jueves",
        "Friday" => "Viernes",
        "Saturday" => "Sabado",
        "Sunday" => "Domingo",
    ];

    public function generacion($idCliente) 
    {
        $res = $this->generacionScript($idCliente);

        return response()->json($res);
    }

    public function generacionScript($idCliente) 
    {
    
        $cliente = DB::table('clientes')
        ->select([
            "clientes.diaAlta as fechaAlta",
            "clientes.idCliente",
            "creditos.plazos",
            "creditos.idCredito",
            "creditos.monto",
            DB::raw("(creditos.monto * 0.10) as montoSemanal"),
        ])
        ->join('creditos','clientes.idCliente','=','creditos.cliente_id')
        ->where('idCliente', $idCliente)
        ->get();
        
        ControlPagos::where('cliente_id', $idCliente)->delete();
        if(count($cliente) > 0){

            $cliente = $cliente[0];
            $fechaAlta = $cliente->fechaAlta;
            $plazos = $cliente->plazos;
            $montoSemanal = $cliente->montoSemanal;
            $semana = 1;
            
            $datos = [];
            while($semana <= $plazos){
                $fechaSemana = date('Y-m-d', strtotime($fechaAlta . "+$semana weeks"));
                $nWeek = date('l', strtotime($fechaSemana));
                $nombreDiaSemana = $this->translateDay[$nWeek];
                
                $data = [
                    'monto' => $montoSemanal, 
                    'diaSemana' => $nombreDiaSemana, 
                    'semana' => $semana, 
                    'cliente_id' => $idCliente, 
                    'credito_id' => $cliente->idCredito, 
                    'fechaSemana' => $fechaSemana, 
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
                $semana++;
                array_push($datos, $data);
                
            }
            ControlPagos::insert($datos);
        }

        return [
            'status' => true,
            'idCliente' => $idCliente,
            'datos' => $datos,
            'msg' => 'Datos de pagos registrados correctamente',
        ];

    }

    public function generacionTodosClientes() 
    {
        $clientes = DB::table('clientes')
        ->select("clientes.idCliente")
        ->get();

        $res = [];
        foreach( $clientes as $cliente) {
            array_push($res, $this->generacionScript($cliente->idCliente));
        }

        return response()->json($res);
    }


    public function controlPorCliente($idCliente) 
    {
        $controlPagos = ControlPagos::where('cliente_id', $idCliente)->get();

        return response()->json($controlPagos);
    }
}
