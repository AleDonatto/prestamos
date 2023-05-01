<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
</head>
<body>
    <style>
    .invisiblexd {
        border:white solid 1px;
    }
    .cajaExt{
        position: relative;
    }/* center class for add style in div */
    .cajaFirma{
        width:250px;
        position: absolute;
        top: 8%; 
        left: 50%;
        transform: translate(-50%, -50%);
        margin-top: 10px; 
        border-top:solid black 1px;
    }
    @page {
		margin-left: 0.5cm;
		margin-right: 0;
	}
    .page-break {
        page-break-after: always;
    }

    .font-size-10{
        font-size: 0.60rem;
    }

    .font-size-9{
        font-size: 0.50rem; 
    }

    table, th, td {
        border: 1px solid black !important;
        border-collapse: collapse !important;
    }
    .vertical-text{
        /*transform: rotate(180deg);*/
        transform: rotate(270deg);
        transform-origin: left top 0;
    }
    .width-fecha{
        width: 90px;
        margin-top: 60px;
        margin-left: 1px;
    }

    .max-w-table {
        width: 97% !important;
    }

    .text-uppercase{
        text-transform: uppercase;
    }

    .px-1{
        padding-left: 3px;
        padding-right: 3px;
    }
    header {
        position: fixed;
        margin-top: 20px;
        left: 0px;
        right: 0px;
        height: 50px;

        /** Extra personal styles **/
        /*background-color: #03a9f4;
        color: white;
        text-align: center;
        line-height: 35px;*/
    }

    footer {
        position: fixed;
        bottom: -60px;
        left: 0px;
        right: 0px;
        height: 50px;

        /** Extra personal styles **/
        background-color: #03a9f4;
        color: white;
        text-align: center;
        line-height: 35px;
    }

    thead {
    display: table-header-group;
    }
    tfoot {
    display: table-row-group;
    }
    table {
    width: 98%;
    border-collapse: collapse;
    }
    th {
    word-break: break-all;
    word-wrap: break-word;
    }
    tr {
    page-break-inside: avoid;
    }
    </style>
    <main>
        <!-- Lunes -->
        <div class="" style="margin-bottom: 10px;">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 100%;" colspan="20">
                            ESTIMACION SEMANAL
                        </th>
                    </tr>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 100%;" colspan="20">
                            {{ $txtFechasEstimas }}
                        </th>
                    </tr>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">Horario</th>
                        <th class="font-size-9 px-1" style="height: 12px; width: 10px;  background-color:darkgray;">Lunes</th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 150 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 200 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 250 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 300 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 350 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 400 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 450 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> 500 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> Total  </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px; background-color:darkgray;"> TA </th>
                    </tr>
                </thead>
                <tbody>
                @if(count($datos['lunes']) > 0)
                @foreach($datos['lunes'] as $estimaPorDia)
                <tr>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['horario']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> {{$estimaPorDia['nombre_municipio']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nPrimerPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoPrimerPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSegundoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSegundoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nTercerPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoTercerPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nCuartoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoCuartoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nQuintoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoQuintoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSextoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSextoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSeptimoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSeptimoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nOctavoPrestamo']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoOctavoPrestamo']}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalMonto']}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalAbonos']}} </td>
                </tr>
                @endforeach

                <tr>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">   </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> TOTALES </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nPrimerPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoPrimerPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nSegundoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoSegundoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nTercerPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoTercerPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nCuartoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoCuartoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nQuintoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoQuintoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nSextoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoSextoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nSeptimoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoSeptimoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->nOctavoPrestamo}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->montoOctavoPrestamo}} </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->totalMonto}} </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['lunes']->totalAbonos}} </td>
                </tr>
                @endif
                @if(count($datos['lunes']) == 0)
                <tr>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                </tr>
                @endif
                </tbody>
            </table>
        </div>

        <!-- Martes -->
        <div class="" style="margin-bottom: 10px;">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">Horario</th>
                        <th class="font-size-9 px-1" style="height: 12px; width: 10px;  background-color:darkgray;">Martes</th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 150 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 200 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 250 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 300 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 350 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 400 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 450 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 500 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> Total  </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> TA </th>
                    </tr>
                </thead>
                <tbody>
                    @if(count($datos['martes']) > 0)
                    @foreach($datos['martes'] as $estimaPorDia)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['horario']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> {{$estimaPorDia['nombre_municipio']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nPrimerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoPrimerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSegundoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSegundoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nTercerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoTercerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nCuartoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoCuartoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nQuintoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoQuintoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSextoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSextoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSeptimoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSeptimoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nOctavoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoOctavoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalMonto']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalAbonos']}} </td>
                    </tr>
                    @endforeach
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">   </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;  background-color:darkgray;"> TOTALES </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nPrimerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoPrimerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nSegundoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoSegundoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nTercerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoTercerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nCuartoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoCuartoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nQuintoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoQuintoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nSextoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoSextoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nSeptimoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoSeptimoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->nOctavoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->montoOctavoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->totalMonto}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['martes']->totalAbonos}} </td>
                    </tr>
                    @endif
                    @if(count($datos['martes']) == 0)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    </tr>
                    @endif

                </tbody>
            </table>
        </div>

        <!-- Miercoles -->
        <div class="" style="margin-bottom: 10px;">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">Horario</th>
                        <th class="font-size-9 px-1" style="height: 12px; width: 10px;  background-color:darkgray;">Miercoles</th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 150 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 200 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 250 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 300 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 350 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 400 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 450 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 500 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> Total  </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> TA </th>
                    </tr>
                </thead>
                <tbody>
                    @if(count($datos['miercoles']) > 0)
                    @foreach($datos['miercoles'] as $estimaPorDia)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['horario']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> {{$estimaPorDia['nombre_municipio']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nPrimerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoPrimerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSegundoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSegundoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nTercerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoTercerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nCuartoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoCuartoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nQuintoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoQuintoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSextoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSextoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSeptimoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSeptimoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nOctavoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoOctavoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalMonto']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalAbonos']}} </td>
                    </tr>
                    @endforeach
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">   </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;  background-color:darkgray;"> TOTALES </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nPrimerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoPrimerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nSegundoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoSegundoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nTercerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoTercerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nCuartoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoCuartoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nQuintoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoQuintoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nSextoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoSextoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nSeptimoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoSeptimoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->nOctavoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->montoOctavoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->totalMonto}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['miercoles']->totalAbonos}} </td>
                    </tr>
                    @endif
                    @if(count($datos['miercoles']) == 0)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    </tr>
                    @endif

                </tbody>
            </table>
        </div>
        
        <!-- Jueves -->
        <div class="" style="margin-bottom: 10px;">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">Horario</th>
                        <th class="font-size-9 px-1" style="height: 12px; width: 10px;  background-color:darkgray;">Jueves</th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 150 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 200 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 250 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 300 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 350 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 400 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 450 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 500 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> Total  </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> TA </th>
                    </tr>
                </thead>
                <tbody>
                    @if(count($datos['jueves']) > 0)
                    @foreach($datos['jueves'] as $estimaPorDia)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['horario']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> {{$estimaPorDia['nombre_municipio']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nPrimerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoPrimerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSegundoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSegundoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nTercerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoTercerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nCuartoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoCuartoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nQuintoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoQuintoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSextoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSextoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSeptimoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSeptimoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nOctavoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoOctavoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalMonto']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalAbonos']}} </td>
                    </tr>
                    @endforeach
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">   </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;  background-color:darkgray;"> TOTALES </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nPrimerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoPrimerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nSegundoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoSegundoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nTercerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoTercerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nCuartoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoCuartoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nQuintoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoQuintoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nSextoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoSextoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nSeptimoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoSeptimoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->nOctavoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->montoOctavoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->totalMonto}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['jueves']->totalAbonos}} </td>
                    </tr>
                    @endif
                    @if(count($datos['jueves']) == 0)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    </tr>
                    @endif

                </tbody>
            </table>
        </div>

        <!-- Viernes -->
        <div class="" style="margin-bottom: 10px;">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">Horario</th>
                        <th class="font-size-9 px-1" style="height: 12px; width: 10px;  background-color:darkgray;">Viernes</th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 150 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 200 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 250 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 300 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 350 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 400 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 450 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> 500 </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> $ </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> Total  </th>
                        <th class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;  background-color:darkgray;"> TA </th>
                    </tr>
                </thead>
                <tbody>
                    @if(count($datos['viernes']) > 0)
                    @foreach($datos['viernes'] as $estimaPorDia)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['horario']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px; background-color:darkgray;"> {{$estimaPorDia['nombre_municipio']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nPrimerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoPrimerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSegundoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSegundoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nTercerPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoTercerPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nCuartoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoCuartoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nQuintoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoQuintoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSextoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSextoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nSeptimoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoSeptimoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['nOctavoPrestamo']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['montoOctavoPrestamo']}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalMonto']}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$estimaPorDia['totalAbonos']}} </td>
                    </tr>
                    @endforeach
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">   </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;  background-color:darkgray;"> TOTALES </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nPrimerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoPrimerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nSegundoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoSegundoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nTercerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoTercerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nCuartoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoCuartoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nQuintoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoQuintoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nSextoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoSextoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nSeptimoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoSeptimoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->nOctavoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->montoOctavoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->totalMonto}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['viernes']->totalAbonos}} </td>
                    </tr>
                    @endif
                    @if(count($datos['viernes']) == 0)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 50px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">  </td>
                    </tr>
                    @endif

                </tbody>
            </table>
        </div>



        <!-- totalSemana -->
        <div class="" style="margin-bottom: 10px; margin-left:172px;">
            <table >
                <tbody>
                    <tr>
                        <!-- <td class="invisiblexd" style="height: 12px; width: 25px;"></td>
                        <td class=" invisiblexd" style="height: 12px; width: 50px;"></td> -->
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nPrimerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoPrimerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nSegundoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoSegundoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nTercerPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoTercerPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nCuartoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoCuartoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nQuintoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoQuintoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nSextoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoSextoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nSeptimoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoSeptimoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->nOctavoPrestamo}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->montoOctavoPrestamo}} </td>
                        
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->totalMonto}} </td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;"> {{$totales['totalSemana']->totalAbonos}} </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="cajaExt">
            <div class="cajaFirma">
                <p style="text-align: center;">C. Carlos Barrera Arroyo</p>
            </div>
        </div>

    </main>
    
</body>
</html>