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
    .page-break {
        page-break-after: always;
    }

    .font-size-10{
        font-size: 0.60rem;
    }

    .max-w-15{
        width: 15px !important;
    }

    .borders{
        margin-left: -20px;
    }

    .vertical-text{
        writing-mode: vertical-rl;
        text-orientation: upright;
        transform: rotate(90deg);
    }

    .pading-0{
        padding: 0px;
    }
    </style>
    <table class="table table-bordered borders" style="width:100%">
        <tr>
            <th class="font-size-10">Cred.</th>
            <th class="font-size-10">Gpo</th>
            <th class="font-size-10">Cliente</th>
            <th class="font-size-10">Direccion</th>
            <th class="font-size-10">Garantias <br>/Tel.</th>
            <th class="font-size-10">Aval</th>
            <th class="font-size-10">Direccion Aval</th>
            <th class="font-size-10">Garantias <br>/Tel. Aval</th>
            <th class="font-size-10">Pago</th>
            <th class="font-size-10">1</th>
            <th class="font-size-10">2</th>
            <th class="font-size-10">3</th>
            <th class="font-size-10">4</th>
            <th class="font-size-10">5</th>
            <th class="font-size-10">6</th>
            <th class="font-size-10">7</th>
            <th class="font-size-10">8</th>
            <th class="font-size-10">9</th>
            <th class="font-size-10">10</th>
            <th class="font-size-10">11</th>
            <th class="font-size-10">12</th>
            <th class="font-size-10">13</th>
            <th class="font-size-10">14</th>
        </tr>
        @foreach($clientes as $client)
        <tr>
            <td class="font-size-10 px-0" style="height: 120px; max-width: 10px;">{{ $client->idCredito }}</td>
            <td class="font-size-10 px-0" style="height: 120px; max-width: 10px;">{{ $client->nombreGrupo }}</td>
            <td class="font-size-10 px-1" style="height: 130px; max-width: 25px;">{{ $client->nombre}} <br> {{$client->apellido_paterno }} <br> {{$client->apellido_materno}}</td>
            <td class="font-size-10 px-1" style="height: 120px; max-width: 25px;">{{ $client->municipio }} {{$client->poblado}} {{$client->calle}}</td>
            <td class="font-size-10 px-1" style="height: 120px; max-width: 25px;">{{ $client->garantias }} <br> Tel: {{$client->telefono}} </td>
            <td class="font-size-10 px-1" style="height: 120px; max-width: 25px;">{{ $client->nombre_aval}}</td>
            <td class="font-size-10 px-1" style="height: 120px; max-width: 25px;">{{ $client->municipio_aval }} {{$client->poblado_aval}} {{$client->calle_aval}}</td>
            <td class="font-size-10 px-1" style="height: 120px; max-width: 25px;">{{ $client->garantias_aval}} <br>Tel: {{$client->telefono_aval}}</td>
            <td class="font-size-10 px-0" style="height: 120px; min-width: 15px;">$2000.00</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 8 days")); }}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 16 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 24 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 32 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 40 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 48 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 56 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 64 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 72 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 80 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 88 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 96 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 104 days"));}}</td>
            <td class="font-size-10 px-2" style="height: 120px; max-width: 20px;">{{date("Y-m-d",strtotime($client->diaAlta."+ 112 days"));}}</td>
        </tr>
        @endforeach
    </table>
</body>
</html>