import React, { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2'

const CarteraVencida = (props) => {

    const [listClientes, setListPagos] = useState([]);

    const columnsGrid = [
        { field: 'municipio', headerName: 'Municipio',  width: 370},
        { field: 'abonos', headerName: 'Abonos',  width: 330},
        { field: 'montos', headerName: 'Monto Total',  width: 210},        
    ];

    const getDatos = () => {
        let params = {};
        axios.get('cartera-vencida')
        .then((res) => {
            setListPagos(res.data.datos)
        })
        .catch( (err) => {

        })
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
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6  pt-5 text-gray-900">
                            <div className='mt-10 grid lg:grid-cols-1 sm:grid-cols-1 gap-4'>
                                <Paper>
                                    <div style={{ height: 500, width: "100%" }}>
                                    <DataGrid
                                        getRowId={(row) => row.idMunicipio}
                                        rows={listClientes}
                                        columns={columnsGrid}
                                        checkboxSelection
                                        rowsPerPage={25}
                                    /> 
                                    </div>
                                </Paper>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default CarteraVencida
