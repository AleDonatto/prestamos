import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Swal from 'sweetalert2'

export const ListGrupos = () => {

    const [grupos, setgrupos] = useState([])
    const [grupo, setgrupo] = useState({
        idGrupo: 0,
        nombreGrupo: '',
        nombreGrupo_edit: ''
    })
    const [open, setOpen] = useState(false); //dialog
    const [deleteDialod, setdeleteDialod] = useState(false)

    const handlegetGrupos = () => {
        axios.get('/grupos/list')
        .then( res => {
            console.log(res.data)
            const listData = res.data.grupos
            setgrupos(listData)
        })
        .catch(err => {
            console.log(err.response)
        })

    }

    const handlechangeGrupo = (e) => {
        setgrupo({
            ...grupo,
            [e.target.name]: e.target.value
        })
    }

    const handleClickOpen = (e, item) => {
        setgrupo({
            ...grupo,
            idGrupo: item.row.idGrupo,
            nombreGrupo: item.row.nombreGrupo,
            nombreGrupo_edit: item.row.nombreGrupo
        })
        setOpen(true);
    };

    const handleDeleteOpen = (e, item) => {
        setgrupo({
            ...grupo,
            idGrupo: item.row.idGrupo,
            nombreGrupo: item.row.nombreGrupo,
            nombreGrupo_edit: item.row.nombreGrupo
        })
        setdeleteDialod(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseDelete = () => {
        setdeleteDialod(false);
    };

    const handleEditGrupo = () => {
        axios.post('/grupos/edit', grupo)
        .then(res => {
            console.log(res.data)

            Swal.fire({
                position: 'top-end',
                icon: res.data.status,
                title: res.data.message,
                showConfirmButton: false,
                timer: 10000
            })

            setgrupo({
                ...grupo,
                idGrupo: 0,
                nombreGrupo: '',
                nombreGrupo_edit: ''
            })

            handlegetGrupos()
        })
        .catch( err => {
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

    const handleDeleteGrupo = () => {
        axios.post('/grupos/delete', grupo)
        .then(res => {
            console.log(res.data)

            Swal.fire({
                position: 'top-end',
                icon: res.data.status,
                title: res.data.message,
                showConfirmButton: false,
                timer: 10000
            })

            setgrupo({
                ...grupo,
                idGrupo: 0,
                nombreGrupo: '',
                nombreGrupo_edit: ''
            })

            handlegetGrupos()
        })
        .catch( err => {
            console.log(err.response)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'No es posible Eliminar el Grupo',
                showConfirmButton: false,
                timer: 10000
            })
        })
    }

    const columnsGrid = [
        { field: 'idGrupo', headerName: ' #', flex: 0.3},
        { field: 'nombreGrupo', headerName: ' Grupo Texto', flex: 1},
        {
            field: "Actions",
            flex: 0.3,
            renderCell: (cellValues) => {
                return (
                    <div>
                        <Button onClick={(e) => {
                            handleClickOpen(e, cellValues)
                        }}>
                            <EditIcon />
                        </Button>
                        
                        {/*<Button onClick={(e) => {
                            handleDeleteOpen(e, cellValues)
                        }}>
                            <DeleteOutlineIcon />
                    </Button>*/}
                        
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

    useEffect(() => {
        handlegetGrupos()
    }, [])
    


    return (
        <div>
            <div className='mt-10 bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                <div className="p-6 text-gray-900">
                    <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold mb-5'>Lista de Grupos</h1>
                    <Paper>
                        <div style={{ height: 500, display: 'flex', width: "100%" }}>
                            <DataGrid
                                getRowId={(row) => row.idGrupo}
                                rows={grupos}
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
                    <ValidatorForm onSubmit={handleEditGrupo}>
                        <DialogTitle id="alert-dialog-title">
                            {"Editar Nombre Grupo"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Esta a punto de remplazar el municipio con nombre: "{grupo.nombreGrupo}"
                            </DialogContentText>
                            <div className='-mx-3 mt-5 flex flex-wrap'>
                                <div className="w-full px-3">
                                    <TextValidator id="" label="Nombre Grupo" name='nombreGrupo_edit' className="w-full outline-0 focus:border-0" value={grupo.nombreGrupo_edit} onChange={handlechangeGrupo} 
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

            <div>
                <Dialog open={deleteDialod} onClose={handleCloseDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <ValidatorForm onSubmit={handleDeleteGrupo}>
                        <DialogTitle id="alert-dialog-title">
                            {"Editar Nombre Grupo"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                ¿Esta seguro que desea eliminar el grupo: "{grupo.nombreGrupo}" ?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button type='button' onClick={handleCloseDelete} variant="outlined">Cancelar</Button>
                            <Button type='submit' onClick={handleCloseDelete} variant="contained">
                                Eliminar
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
            </div>
        </div>
    )
}
