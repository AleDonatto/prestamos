import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'

export const FormMunicipios = () => {
    const [municipios, setmunicipios] = useState({
        idMunicipio: 0,
        nombreMunicipio: '',
        nombreMunicipio_edit: ''
    })

    const [listMunicipios, setlistMunicipios] = useState([]) //data grid municipios

    const [open, setOpen] = React.useState(false); //dialog

    const handleChange = (e) => {
        setmunicipios({
            ...municipios,
            [e.target.name]: e.target.value
        })
    }
     
    const handleSubmitMunicipios = (e) => {
        e.preventDefault()
        axios.post('/municipios/create', municipios)
        .then( res => {
            console.log(res.data)

            Swal.fire({
                position: 'top-end',
                icon: res.data.status,
                title: res.data.message,
                showConfirmButton: false,
                timer: 10000
            })
            setmunicipios({
                ...municipios,
                nombreMunicipio: ''
            })
            handlegetMunicipios()
        })
        .catch(err => {
            console.log(err.response)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 10000
            })
        })
    }

    const handleEditMunicipios = (e) => {
        e.preventDefault()

        axios.post('/municipios/edit', municipios)
        .then( res => {
            console.log(res.data)

            Swal.fire({
                position: 'top-end',
                icon: res.data.status,
                title: res.data.message,
                showConfirmButton: false,
                timer: 10000
            })
            setmunicipios({
                ...municipios,
                nombreMunicipio: '',
                nombreMunicipio_edit: ''
            })

            handlegetMunicipios()

        })
        .catch(err => {
            console.log(err.response)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 10000
            })
        })
    }

    const handlegetMunicipios = () => {
        axios.get('/municipios/list')
        .then(res => {
            console.log(res.data)
            const list = res.data.listMunicipios
            setlistMunicipios(list)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleClickOpen = (e, item) => {
        setmunicipios({
            ...municipios,
            idMunicipio: item.row.idMunicipio,
            nombreMunicipio: item.row.nombreMunicipio,
            nombreMunicipio_edit: item.row.nombreMunicipio
        })
        setOpen(true);
    };

    const handleDeleteMunicipio = async (e, item) => {
        //console.log(item)
        try {
            const request = {
                idMunicipio: item.row.idMunicipio
            }
            const {data} = await axios.post('/municipios/delete', request)
            console.log(data)

            Swal.fire({
                position: 'top-end',
                icon: data.status,
                title: data.message,
                showConfirmButton: false,
                timer: 10000
            })
            
        } catch (error) {
            //console.log(error)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No es posible eliminar el Municipio',
                showConfirmButton: false,
                timer: 20000
            })
            //console.log('error delete municipios')
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        handlegetMunicipios()
    }, [])

    const columnsGrid = [
        { field: 'idMunicipio', headerName: ' #', flex: 0.3},
        { field: 'nombreMunicipio', headerName: ' Municipio', flex: 0.7},
        {
            field: "Actions",
            flex: 0.2,
            renderCell: (cellValues) => {
                return (
                    <div>
                        {/*<Button
                        className='px-2'
                        variant="text"
                        endIcon={<EditIcon />}
                        onClick={(event) => {
                        handleClick(event, cellValues);
                        }}
                        >
                        </Button>*/}
                        {
                            <Button onClick={(e) => {
                                handleClickOpen(e, cellValues)
                            }}>
                                <EditIcon />
                            </Button>
                        }
                        {
                            <Button onClick={(e) => {
                                handleDeleteMunicipio(e, cellValues)
                            }}>
                                <DeleteIcon /> 
                            </Button>
                        }
                    </div>
                );
            }
        }
    ];

    const handleCellClick = (param, event) => {
        event.stopPropagation();
    };
        
    const handleRowClick = (param, event) => {
        event.stopPropagation();
    };      
    

    return (
        <div>
            <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                <div className='p-6 text-gray-900'>
                    <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>Agregar Municipios</h1>
                    <ValidatorForm onSubmit={handleSubmitMunicipios}>
                        <div className='-mx-3 mt-5 flex flex-wrap'>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Nombre Municipio" name='nombreMunicipio' className="w-full outline-0 focus:border-0" value={municipios.nombreMunicipio} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 50 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <Button type='submit' variant='contained' className='mt-6'>Agregar</Button>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                            </div>
                        </div>
                    </ValidatorForm>
                </div>
            </div>

            <div className='mt-10 bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                <div className="p-6 text-gray-900">
                    <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold mb-5'>Lista de Municipios</h1>
                    <Paper>
                        <div style={{ height: 500, display: 'flex', width: "100%" }}>
                            <DataGrid
                                getRowId={(row) => row.idMunicipio}
                                rows={listMunicipios}
                                columns={columnsGrid}
                                checkboxSelection
                                pageSize={25}
                                rowsPerPageOptions={[25, 50, 100]}
                                pagination
                                onCellClick={handleCellClick}
                                onRowClick={handleRowClick}
                            />
                        </div>
                    </Paper>
                </div>
            </div>

            <div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <ValidatorForm onSubmit={handleEditMunicipios}>
                        <DialogTitle id="alert-dialog-title">
                            {"Editar Nombre Municipio"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Esta a punto de remplazar el municipio con nombre: "{municipios.nombreMunicipio}"
                            </DialogContentText>
                            <div className='-mx-3 mt-5 flex flex-wrap'>
                                <div className="w-full px-3">
                                    <TextValidator id="" label="Nombre Municipio" name='nombreMunicipio_edit' className="w-full outline-0 focus:border-0" value={municipios.nombreMunicipio_edit} onChange={handleChange} 
                                    validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 50 }}/>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button type='button' onClick={handleClose} variant="outlined">Cancelar</Button>
                            <Button type='submit' onClick={handleClose} variant="contained" autoFocus>
                                Modificar
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        </div>
    )
}
