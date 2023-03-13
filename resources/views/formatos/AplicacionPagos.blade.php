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
                        <th class="font-size-9" style="width: 15px;">Credito.</th>
                        <th class="font-size-9 text-center" style="width: 15px;">Cliente</th>
                        <th class="font-size-9 text-center" style="width: 20px;">Capital.</th>
                        <th class="font-size-9 text-center" style="max-width: 60px;">Pago regular</th>
                        <th class="font-size-9 text-center" style="width: 18px;">Pagos</th>
                        <th class="font-size-9 text-center">Grupo</th>
                        <th class="font-size-9 text-center">Municipio</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($datos as $client)
                    <tr>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['credito'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['cliente'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['capital'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['pagoRegular'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['pagos'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['grupo_id'] }}</td>
                        <td class="font-size-9 px-1 text-center" style="height: 12px; width: 10px;">{{ $client['nombreMunicipio'] }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </main>
    
</body>
</html>