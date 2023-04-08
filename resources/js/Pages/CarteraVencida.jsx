import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Link, Tooltip, Autocomplete } from '@mui/material';
import { Head } from '@inertiajs/react'
import Paper from '@mui/material/Paper';
import UpdateIcon from '@mui/icons-material/Update';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { DataGrid } from '@mui/x-data-grid';

const CarteraVencida = (props) => {

    const [listClientes, setListPagos] = useState([]);
    const [listClientesVencidos, setListClientesVencidos] = useState([]);
    const [apartado, setApartado] = useState('main');
    const [idMunicipio, setIdMunicipio] = useState(null);
    const [montoTotal, setMontoTotal] = useState(0);
    const [abonosTotal, setAbonosTotal] = useState(0);
    const [municipioSelect, setMunicipioSelect] = useState({
        municipio: '',
        abonos: 0,
        montos: 0,
    });
    const [listMunicipios, setlistMunicipios] = useState({
        municipio: 0
    })
    const [minicipios, setminicipios] = useState([])



    const columnsGridClientesVencidos = [
        { field: 'cliente', headerName: 'Cliente', width: 370 },
        { field: 'grupo', headerName: 'Grupo', width: 110 },
        { field: 'abonos', headerName: 'Abonos', width: 110 },
        { field: 'montos', headerName: 'Monto', width: 210 },
        { field: 'fechaSemana', headerName: 'Fecha vencida', width: 230 },
    ];


    const columnsGrid = [
        { field: 'municipio', headerName: 'Municipio', width: 370 },
        { field: 'abonos', headerName: 'Abonos', width: 330 },
        { field: 'montos', headerName: 'Monto Total', width: 210 },
        {
            field: "Acciones",
            width: 130,
            renderCell: (cellValues) => {
                return (
                    <Tooltip title="Clientes vencidos" placement="top-start">
                        <Link onClick={(e) => { handleOpenDetalles(e, cellValues.row.idMunicipio) }}>
                            <FormatListBulletedIcon />
                        </Link>
                    </Tooltip>
                );
            }
        },
    ];


    const handlegetMunicipios = async () => {
        axios.get('/municipios/list')
            .then(res => {
                const dataMunicipios = res.data.listMunicipios
                dataMunicipios.unshift({
                    idMunicipio: null,
                    nombreMunicipio: 'Todos'
                })

                setminicipios(dataMunicipios)
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    const getDatos = (idMunicipio = null) => {
        axios.get('cartera-vencida')
            .then((res) => {
                let resData = res.data.datos
                console.log("Cartera nueva")

                if (idMunicipio !== null) {
                    resData = resData.filter((dato) => dato.idMunicipio == idMunicipio)
                }
                setListPagos(resData)
                let montoTotalAux = resData.reduce((current, carry) => {
                    return current += carry.montos;
                }, 0);
                let abonosTotalAux = resData.reduce((current, carry) => {
                    return current += carry.abonos;
                }, 0);
                
                setMontoTotal(montoTotalAux)
                setAbonosTotal(abonosTotalAux)
            })
            .catch((err) => {

            })
    }

    const filtarPorMunicipio = (e, idMunicipio) => {
        e.preventDefault()
        getDatos(idMunicipio)

    }

    const handleOpenDetalles = (e, idMunicipio) => {
        e.preventDefault()
        setIdMunicipio(idMunicipio)
        axios.post('cartera-vencida-municipio', { idMunicipio })
            .then((res) => {
                if (res.data.datos) {
                    let muniData = {
                        municipio: res.data.datos[0].municipio,
                        abonos: res.data.datos[0].abonos,
                        montos: res.data.datos[0].montos
                    }
                    let clientes = res.data.datos[0].clientes
                    console.log('clientes')
                    console.log(clientes)
                    setListClientesVencidos(clientes)
                    setMunicipioSelect(muniData)
                    setApartado('clientes')
                }
            })
            .catch((err) => {

            })
    }

    const exportarExcelPorMunicipio = () => {
        axios.get('cartera-vencida-reporte-municipio/' + idMunicipio, {
            headers: { 'Content-Type': 'multipart/form-data' },
            'responseType': 'blob'
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Cartera vencida de ' + municipioSelect.municipio + '.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {

            })
    }

    const exportarExcelGeneral = () => {
        axios.get('cartera-vencida-reporte', {
            headers: { 'Content-Type': 'multipart/form-data' },
            'responseType': 'blob'
        })
            .then((res) => {

                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'Cartera vencida.xlsx');
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {

            })
    }

    const backToMain = () => {
        setApartado('main')
    }

    useEffect(() => {
        getDatos(null)
        handlegetMunicipios()
    }, [])

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Cartera vencida</h2>}
        >
            <Head title="Cartera vencida"></Head>
            {
                apartado == 'main' ?
                    <div className="py-12">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6  pt-5 text-gray-900">
                                    <div className='mt-5 grid lg:grid-cols-6 md:grid-cols-1 gap-4'>
                                        <div className=' flex'>
                                            <FormControl className='w-48'>
                                                <Autocomplete
                                                    disablePortal
                                                    options={minicipios}
                                                    getOptionLabel={option => option.nombreMunicipio || ''}
                                                    onChange={(e, item) => { filtarPorMunicipio(e, item != null ? item.idMunicipio : null) }}
                                                    renderInput={(params) => <TextField className='border-0 border-none focus:border-none'  {...params} label="Municipio" />}
                                                />
                                            </FormControl>
                                        </div>
                                        <div className='col-span-2 flex mt-2 ml-2'>
                                            <div className="pr-2">
                                                <Tooltip title="Descargar reporte" placement="top-start">
                                                    <Button variant="outlined" endIcon={<UpdateIcon />} className='mx-5' onClick={exportarExcelGeneral}>Descargar reporte</Button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>


                                    <div className='grid lg:grid-cols-1 sm:grid-cols-1 gap-4 mt-1'>
                                        <div className='m-3'>
                                            <strong> Abonos Totales: </strong> {abonosTotal}
                                            &nbsp;
                                            &nbsp;
                                            &nbsp;
                                            <strong> Monto Total: </strong> {montoTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                        </div>
                                        <Paper>
                                            <div style={{ height: 500, width: "100%" }}>
                                                <DataGrid
                                                    getRowId={(row) => row.idMunicipio}
                                                    rows={listClientes}
                                                    columns={columnsGrid}
                                                    rowsPerPage={10}
                                                />
                                            </div>
                                        </Paper>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    :
                    <div className="py-12">

                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6  pt-5 text-gray-900">
                                    <h1 className='my-4'>
                                        <strong>Municipio: </strong>
                                        {municipioSelect.municipio}
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <strong>Abonos: </strong>
                                        {municipioSelect.abonos}
                                        &nbsp;
                                        &nbsp;
                                        &nbsp;
                                        <strong>Monto total: </strong>
                                        {municipioSelect.montos}
                                    </h1>
                                    <div className='col-span-2 flex mt-2'>
                                        <div className='pr-2'>
                                            <Button type='button' variant='contained' startIcon={<ArrowBackIcon />}  onClick={backToMain} >Regresar</Button>
                                        </div>
                                        <div className="pr-2">
                                            <Tooltip title="Descargar reporte" placement="top-start">
                                                <Button variant="outlined" endIcon={<UpdateIcon />} className='mx-5' onClick={exportarExcelPorMunicipio}>Descargar reporte</Button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className='mt-3 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
                                        <Paper>
                                            <div style={{ height: 500, width: "100%" }}>
                                                <DataGrid
                                                    getRowId={(row) => row.id}
                                                    rows={listClientesVencidos}
                                                    columns={columnsGridClientesVencidos}
                                                    rowsPerPage={10}
                                                />
                                            </div>
                                        </Paper>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
            }
        </AuthenticatedLayout>
    )
}

export default CarteraVencida
