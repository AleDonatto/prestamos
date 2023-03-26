import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Button, TextField, FormControl, Select, InputLabel, MenuItem, Modal, Box, Typography, Link, Tooltip } from '@mui/material';
import { Head } from '@inertiajs/react'
import Paper from '@mui/material/Paper';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2'

const CarteraVencida = (props) => {

    const [listClientes, setListPagos] = useState([]);
    const [listClientesVencidos, setListClientesVencidos] = useState([]);
    const [apartado, setApartado] = useState('main');
    const [idMunicipio, setIdMunicipio] = useState(null);
    const [municipioSelect, setMunicipioSelect] = useState({
        municipio: '',
        abonos: 0,
        montos: 0,
    });
    
    
    const columnsGridClientesVencidos = [
        { field: 'cliente', headerName: 'Cliente',  width: 370},
        { field: 'abonos', headerName: 'Abonos',  width: 330},
        { field: 'montos', headerName: 'Monto',  width: 210},           
    ];


    const columnsGrid = [
        { field: 'municipio', headerName: 'Municipio',  width: 370},
        { field: 'abonos', headerName: 'Abonos',  width: 330},
        { field: 'montos', headerName: 'Monto Total',  width: 210},        
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

    const getDatos = () => {
        axios.get('cartera-vencida')
        .then((res) => {
            setListPagos(res.data.datos)
        })
        .catch( (err) => {

        })
    }

    const handleOpenDetalles = (e, idMunicipio) => {
        e.preventDefault()
        setIdMunicipio(idMunicipio)
        axios.post('cartera-vencida-municipio', {idMunicipio})
        .then((res) => {
            if(res.data.datos){
                let muniData = {
                    municipio: res.data.datos[0].municipio,
                    abonos: res.data.datos[0].abonos,
                    montos: res.data.datos[0].montos
                }
                let clientes = res.data.datos[0].clientes
                setListClientesVencidos(clientes)
                setMunicipioSelect(muniData)
                setApartado('clientes')
            }
        })
        .catch( (err) => {

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
            link.setAttribute('download', 'Cartera vencida de ' +municipioSelect.municipio+ '.xlsx');
            document.body.appendChild(link);
            link.click();
        })
        .catch( (err) => {

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
        .catch( (err) => {

        })
    }

    const backToMain = () => {
        setApartado('main')
    }

    useEffect(() => {
        getDatos()
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
                                <Button type='button' variant='contained' onClick={exportarExcelGeneral} >Exportar Excel</Button>
                                <div className='mt-10 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
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
                                <h1 className='my-4'>Municipio: {municipioSelect.municipio}</h1>
                                <h1 className='my-4'>Abonos: {municipioSelect.abonos}</h1>
                                <h1 className='my-4'>Monto total: {municipioSelect.montos}</h1>
                                <div className='col-span-2 flex mt-2'>
                                    <div className='pr-2'>
                                        <Button type='button' variant='contained' onClick={backToMain} >Regresar</Button>
                                    </div>
                                    <div className="pr-2">
                                        <Button type='button' variant='contained' onClick={exportarExcelPorMunicipio} >Exportar Excel</Button>
                                    </div>
                                </div>
                                <div className='mt-10 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
                                    <Paper>
                                        <div style={{ height: 500, width: "100%" }}>
                                        <DataGrid
                                            getRowId={(row) => row.idCliente}
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
