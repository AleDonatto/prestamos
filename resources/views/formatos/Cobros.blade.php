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
    <!--<header>
        Cabecera del documento
    </header>

    <footer>
        Copyright © <?php echo date("Y");?>
    </footer>-->
    <main>
        <div class="">
            <table >
                <thead>
                    <tr>
                        <th class="font-size-9" style="width: 15px;">Cred.</th>
                        <th class="font-size-9 text-center" style="width: 15px;">Gpo.</th>
                        <th class="font-size-9 text-center" style="width: 20px;">Clien.</th>
                        <th class="font-size-9 text-center" style="max-width: 60px;">Dir.</th>
                        <th class="font-size-9 text-center" style="width: 18px;">Gar. <br>/Tel. Clien.</th>
                        <th class="font-size-9 text-center">Aval</th>
                        <th class="font-size-9 text-center">Dir. Aval</th>
                        <th class="font-size-9 text-center" style="width: 18px;">Gar. <br>/Tel. Aval</th>
                        <th class="font-size-9 text-center">Pago</th>
                        <th class="font-size-9 text-center">1</th>
                        <th class="font-size-9 text-center">2</th>
                        <th class="font-size-9 text-center">3</th>
                        <th class="font-size-9 text-center">4</th>
                        <th class="font-size-9 text-center">5</th>
                        <th class="font-size-9 text-center">6</th>
                        <th class="font-size-9 text-center">7</th>
                        <th class="font-size-9 text-center">8</th>
                        <th class="font-size-9 text-center">9</th>
                        <th class="font-size-9 text-center">10</th>
                        <th class="font-size-9 text-center">11</th>
                        <th class="font-size-9 text-center">12</th>
                        <th class="font-size-9 text-center">13</th>
                        <th class="font-size-9 text-center">14</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($clientes as $client)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 145px; width: 10px;">{{ $client->idCredito }}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; width: 10px;">{{ $client->idGrupo }}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; width: 20px;">{{ $client->nombre}} <br> {{$client->apellido_paterno }} <br> {{$client->apellido_materno}}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; max-width: 40px;">{{ $client->nombreMunicipio }} <br> {{$client->referencias}}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; width: 54px;">{{ $client->garantias }} <br> {{$client->celular}} </td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; width: 20px;">{{ $client->nombre_aval}} <br> {{$client->apellido_paterno_aval }} <br> {{$client->apellido_materno_aval}}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; max-width: 40px;">{{ $client->nombreMunicipio}} <br> {{$client->referencias_aval}}</td>
                        <td class="font-size-9 px-1 text-uppercase" style="height: 145px; width: 20px;">{{ $client->garantias_aval}} <br>{{$client->telefono_aval}}</td>
                        <td class="font-size-9 px-1" style="height: 145px; width: 15px;">$2000.00</td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">
                                {{date("Y-m-d",strtotime($client->diaAlta."+ 7 days")); }}
                            </p>
                        </td>
                        <td class="font-size-9 px-3 " style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">
                                {{date("Y-m-d",strtotime($client->diaAlta."+ 14 days"));}}
                            </p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 21 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 28 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 35 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 42 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 49 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 56 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 63 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 70 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 77 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 84 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 91 days"));}}</p>
                        </td>
                        <td class="font-size-9 px-3" style="height: 145px; max-width: 18px;">
                            <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 98 days"));}}</p>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="width: 10px;" colspan="8"></td>
                        <td class="font-size-9 px-1 text-center" style="width: 15px;">  {{ '$' . number_format( ($nClientes * 200) , 2 ) }} </td>
                        <td class="font-size-9 px-3" style="max-width: 18px;" colspan="14"></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </main>
    
</body>
</html>