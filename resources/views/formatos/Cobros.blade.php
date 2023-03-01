<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
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

    .max-w-15{
        width: 15px !important;
    }

    .borders{
        margin-left: -220px;
    }

    .pading-0{
        padding: 0px;
    }
    .table-file{
        width:100% !important;
        page-break-inside: avoid !important;
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
        margin-left: -10px;
    }
    </style>
    <div class="container">
    <table class="table borders border-table" >
        <tr>
            <th class="font-size-9" style="max-width: 10px;">Cred.</th>
            <th class="font-size-9" style="max-width: 10px;">Gpo</th>
            <th class="font-size-9" style="max-width: 20px;">Clien.</th>
            <th class="font-size-9" style="max-width: 20px;">Dir.</th>
            <th class="font-size-9" style="max-width: 18px;">Gar. <br>/Tel.</th>
            <th class="font-size-9">Aval</th>
            <th class="font-size-9">Dir. Aval</th>
            <th class="font-size-9" style="max-width: 18px;">Gar. <br>/Tel. Aval</th>
            <th class="font-size-9">Pago</th>
            <th class="font-size-9">1</th>
            <th class="font-size-9">2</th>
            <th class="font-size-9">3</th>
            <th class="font-size-9">4</th>
            <th class="font-size-9">5</th>
            <th class="font-size-9">6</th>
            <th class="font-size-9">7</th>
            <th class="font-size-9">8</th>
            <th class="font-size-9">9</th>
            <th class="font-size-9">10</th>
            <th class="font-size-9">11</th>
            <th class="font-size-9">12</th>
            <th class="font-size-9">13</th>
            <th class="font-size-9">14</th>
        </tr>
        @foreach($clientes as $client)
        <tr>
            <td class="font-size-9 px-1 text-center" style="height: 130px; max-width: 8px;">{{ $client->idCredito }}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 10px;">{{ $client->nombreGrupo }}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{ $client->nombre}} <br> {{$client->apellido_paterno }} <br> {{$client->apellido_materno}}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{ $client->nombreMunicipio }} {{$client->poblado}} {{$client->calle}}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{ $client->garantias }} <br> {{$client->celular}} </td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{ $client->nombre_aval}} <br> {{$client->apellido_paterno_aval }} <br> {{$client->apellido_materno_aval}}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{$client->poblado_aval}} {{$client->calle_aval}}</td>
            <td class="font-size-9 px-1 text-uppercase" style="height: 130px; width: 20px;">{{ $client->garantias_aval}} <br>{{$client->telefono_aval}}</td>
            <td class="font-size-9 px-1" style="height: 130px; min-width: 15px;">$2000.00</td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">
                    {{date("Y-m-d",strtotime($client->diaAlta."+ 8 days")); }}
                </p>
            </td>
            <td class="font-size-9 px-3 " style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">
                    {{date("Y-m-d",strtotime($client->diaAlta."+ 16 days"));}}
                </p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 24 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 32 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 40 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 48 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 56 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 64 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 72 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 80 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 88 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 96 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 104 days"));}}</p>
            </td>
            <td class="font-size-9 px-3" style="height: 130px; max-width: 18px;">
                <p class="vertical-text width-fecha">{{date("Y-m-d",strtotime($client->diaAlta."+ 112 days"));}}</p>
            </td>
        </tr>
        @endforeach
    </table>
    </div>
    
</body>
</html>