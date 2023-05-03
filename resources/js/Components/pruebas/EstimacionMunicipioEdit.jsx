import React, { useEffect, useState } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import { usePage } from '@inertiajs/react'
import Swal from 'sweetalert2'

export const EstimacionMunicipioEdit = (props) => {
    const { datosEstimas } = usePage().props
    const [estimasPorDia, setEstimasPorDia] = useState([]);
    const [estimaSeleccionada, setEstimaSeleccionada] = useState({});
    const [editarEstimaForm, setEditarEstimaForm] = useState(false);
    const [isEditar, setIsEditar] = useState(true);
    const [nuevaEstimaForm, setNuevaEstimaForm] = useState(false);
    const [municipioSeleccionado, setMunicipioSeleccionado] = useState({});
    const [idEstima, setIdEstima] = useState(datosEstimas.id);
       

    useEffect(() => {
        console.log('estimaData')
        console.log(datosEstimas)
        handlegetMunicipios()
        getEstimasPorDia()
    }, []);
    

    const showEditar = () => {
        // props.showEstima(estimasPorDia)
    }

    const getEstimasPorDia = () => {
        // console.log(datosEstimas)
        // console.log(datosEstimas)
        
        axios.post('/estimas-get-dia', {
            dia : datosEstimas.diaSemana,
            idEstima : datosEstimas.idEstima
        }).then((res) => {
            setEstimasPorDia(res.data.datos)
        }).catch( (err) => {

        })
    }

    const onEditar = (e, registro) => {
        e.preventDefault()
        setEditarEstimaForm(true)
        setEstimaSeleccionada(registro)
    }

    const onEditarEstima = (e, estimaSeleccionada) => {
        e.preventDefault()
        
        let montos = (parseInt(estimaSeleccionada.montoPrimerPrestamo) + parseInt(estimaSeleccionada.montoSegundoPrestamo) + parseInt(estimaSeleccionada.montoTercerPrestamo) + parseInt(estimaSeleccionada.montoCuartoPrestamo) + parseInt(estimaSeleccionada.montoQuintoPrestamo) + parseInt(estimaSeleccionada.montoSextoPrestamo) + parseInt(estimaSeleccionada.montoSeptimoPrestamo) + parseInt(estimaSeleccionada.montoOctavoPrestamo) )
        let abonos = parseInt(estimaSeleccionada.nPrimerPrestamo) + parseInt(estimaSeleccionada.nSegundoPrestamo) + parseInt(estimaSeleccionada.nTercerPrestamo) + parseInt(estimaSeleccionada.nCuartoPrestamo) + parseInt(estimaSeleccionada.nQuintoPrestamo) + parseInt(estimaSeleccionada.nSextoPrestamo) + parseInt(estimaSeleccionada.nSeptimoPrestamo) + parseInt(estimaSeleccionada.nOctavoPrestamo) 
      
        axios.post('/estimas-editar', {
            estima : {
                ...estimaSeleccionada, 
                totalMonto: montos,
                totalAbonos: abonos,
            },
            idMunicipio : estimaSeleccionada.idMunicipio,
            dia : datosEstimas.diaSemana,
            idEstima : datosEstimas.idEstima
        })
        .then((res) => {
            if(res.data.status) {
                setNuevaEstimaForm(false)
                setEditarEstimaForm(false)
                setEstimaSeleccionada({})
                getEstimasPorDia()
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'danger',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })  
        .catch((err) => {

        })

    }
    

    const [minicipios, setminicipios] = useState([])


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

    const onNuevo = (e) => {
        e.preventDefault()
        setNuevaEstimaForm(true)
        setEstimaSeleccionada({
            
            horario : '',
            idMunicipio : null,
            //150
            nPrimerPrestamo : 0,
            montoPrimerPrestamo :0,
            //200
            nSegundoPrestamo : 0,
            montoSegundoPrestamo :0,
            //250
            nTercerPrestamo : 0,
            montoTercerPrestamo :0,
            //300
            nCuartoPrestamo : 0,
            montoCuartoPrestamo :0,

            //350
            
            nQuintoPrestamo : 0,
            montoQuintoPrestamo :0,

            //400
            
            nSextoPrestamo : 0,
            montoSextoPrestamo :0,

            //450
            
            nSeptimoPrestamo : 0,
            montoSeptimoPrestamo :0,
            //500
            
            nOctavoPrestamo : 0,
            montoOctavoPrestamo :0,
            totalMonto : 0,
            totalAbonos : 0,
        })
    }

    const onCancelarEdit = (e) => {
        e.preventDefault()

        setNuevaEstimaForm(false)
        setEditarEstimaForm(false)
        setEstimaSeleccionada({})

    }

    const onGuardar = (e, registro) => {
        e.preventDefault()
        
        // console.log(datosEstimas)
        let montos = (parseInt(estimaSeleccionada.montoPrimerPrestamo) + parseInt(estimaSeleccionada.montoSegundoPrestamo) + parseInt(estimaSeleccionada.montoTercerPrestamo) + parseInt(estimaSeleccionada.montoCuartoPrestamo) + parseInt(estimaSeleccionada.montoQuintoPrestamo) + parseInt(estimaSeleccionada.montoSextoPrestamo) + parseInt(estimaSeleccionada.montoSeptimoPrestamo) + parseInt(estimaSeleccionada.montoOctavoPrestamo) )
        let abonos = parseInt(estimaSeleccionada.nPrimerPrestamo) + parseInt(estimaSeleccionada.nSegundoPrestamo) + parseInt(estimaSeleccionada.nTercerPrestamo) + parseInt(estimaSeleccionada.nCuartoPrestamo) + parseInt(estimaSeleccionada.nQuintoPrestamo) + parseInt(estimaSeleccionada.nSextoPrestamo) + parseInt(estimaSeleccionada.nSeptimoPrestamo) + parseInt(estimaSeleccionada.nOctavoPrestamo) 
        axios.post('/estimas-guardar', {
            estima : {
                ...estimaSeleccionada, 
                totalMonto: montos,
                totalAbonos: abonos,
            },
            idMunicipio : municipioSeleccionado.idMunicipio,
            dia : datosEstimas.diaSemana,
            idEstima : datosEstimas.idEstima
        })
        .then((res) => {
            if(res.data.status) {
                setNuevaEstimaForm(false)
                getEstimasPorDia()
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'danger',
                    title: res.data.msg,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })  
        .catch((err) => {

        })
        
    }

    const regresar = (e) => {
        e.preventDefault()
        // props.closeForm(true);
        
    }

    const onEliminar = (e, registro) => {
        e.preventDefault()
        eliminarRegistro(registro)
    }

    const eliminarRegistro = (registro) => {
        axios.get('/estimas-res-delete/' + registro.id)
        .then((res) => {
            getEstimasPorDia()
        }).catch((err) => {

        })
    } 
    
    const handleChange = (e) => {
        let propsMonto = calculateMonto(e.target.name,  e.target.value);

        setEstimaSeleccionada({
            ...estimaSeleccionada,
            [e.target.name] : e.target.value,
            [propsMonto.propMonto] : propsMonto.value,
            
        });

    };

    const  onSetMunicipioSeleccionado = (e, item ) => {
        e.preventDefault()
        // console.log('item')
        // console.log(item)
        setMunicipioSeleccionado(item)
        // console.log(municipioSeleccionado)
    }

    const calculateMonto = (nameProp, nValue) => {
        let monto = {
            nPrimerPrestamo : 150,
            nSegundoPrestamo : 200,
            nTercerPrestamo : 250,
            nCuartoPrestamo : 300,
            nQuintoPrestamo : 350,
            nSextoPrestamo : 400,
            nSeptimoPrestamo : 450,
            nOctavoPrestamo : 500,
        }

        let propMonto = {
            nPrimerPrestamo : 'montoPrimerPrestamo',
            nSegundoPrestamo : 'montoSegundoPrestamo',
            nTercerPrestamo : 'montoTercerPrestamo',
            nCuartoPrestamo : 'montoCuartoPrestamo',
            nQuintoPrestamo : 'montoQuintoPrestamo',
            nSextoPrestamo : 'montoSextoPrestamo',
            nSeptimoPrestamo : 'montoSeptimoPrestamo',
            nOctavoPrestamo : 'montoOctavoPrestamo',
        }

        return {
            propMonto : propMonto[nameProp],
            value: monto[nameProp] * nValue, 
        }
    };

    return (
        <div>
            <h3 className='text-xl mb-5'>Estimas del dia {datosEstimas.diaSemana} de la semana  </h3> 
            <Button startIcon={<ArrowBackIcon />} className='mb-5' type='button' variant="contained"  href={route('pruebas')} >Regresar</Button>
            <div className='w-full border-solid border-2 p-5 rounded-md mt-5'>
                <div className='mt-5 flex flex-row mt-5'>
                    <div className='basis-3/4'>
                        <h2 className='font-black text-xl'>
                            {datosEstimas.diaSemana}
                        </h2>
                    </div>
                    <div className='basis-1/4 p-1 grid justify-items-end'>
                        <Button type='button' variant="contained" className='mb-5' onClick={(e) => {onNuevo(e)}} >Agregar nueva estima</Button>
                    </div>
                </div>
                <table className='w-full border-collapse border border-slate-400'>
                    <thead>
                        <tr>
                            <th className='border border-slate-300'>Horario</th>
                            <th className='border border-slate-300'>Municipio</th>
                            <th className='border border-slate-300'> 150 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 200 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 250 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 300 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 350 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 400 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 450 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> 500 </th>
                            <th className='border border-slate-300'> $ </th>
                            <th className='border border-slate-300'> Total  </th>
                            <th className='border border-slate-300'> TA </th>
                            <th className='border border-slate-300'> Acciones </th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                    estimasPorDia.map( (estimaPorDia) => {
                        return (
                                <tr>
                                    <td className='border border-slate-300'> {estimaPorDia.horario} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.nombre_municipio} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.nPrimerPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoPrimerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nSegundoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoSegundoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nTercerPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoTercerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nCuartoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoCuartoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nQuintoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoQuintoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nSextoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoSextoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nSeptimoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoSeptimoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.nOctavoPrestamo} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.montoOctavoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                    
                                    <td className='border border-slate-300'> {estimaPorDia.totalMonto} </td>
                                    <td className='border border-slate-300'> {estimaPorDia.totalAbonos} </td>
                                  
                                    <td className='border border-slate-300'> 
                                        <Tooltip title="Editar" placement="top-start">
                                            <IconButton aria-label="edit" onClick={(e) => {onEditar(e, estimaPorDia)}}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Eliminar" placement="top-start">
                                            <IconButton aria-label="delete" onClick={(e) => {onEliminar(e, estimaPorDia)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                
                                </tr>
                        )
                    })
                    }
                    </tbody>

    
                </table>
            </div>

            {
                editarEstimaForm 
                ?
                <div className='m-5'>
                    
                    <Button className='mb-5' type='button' variant="contained" size="small" onClick={(e) => {onEditarEstima(e, estimaSeleccionada)}} startIcon={<SendIcon />}>
                        Guardar modificacion
                    </Button>

                    
                    <Button 
                        className='mb-5' 
                        type='button' 
                        variant="contained" 
                        size="small" 
                        onClick={(e) => {onCancelarEdit(e)}} 
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                    <table className='w-full border-collapse border border-slate-400 mt-3'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300'>Municipio</th>
                                <th className='border border-slate-300'> 150 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 200 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 250 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 300 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 350 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 400 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 450 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 500 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> Total  </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> TA </th>
                            </tr>
                        </thead>
        
                        <tbody>
                            <tr>
                                <td className='border border-slate-300'> {estimaSeleccionada.nombre_municipio} </td>

                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nPrimerPrestamo}
                                        name="nPrimerPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoPrimerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSegundoPrestamo}
                                        name="nSegundoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSegundoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nTercerPrestamo}
                                        name="nTercerPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoTercerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nCuartoPrestamo}
                                        name="nCuartoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoCuartoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nQuintoPrestamo}
                                        name="nQuintoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoQuintoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSextoPrestamo}
                                        name="nSextoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSextoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSeptimoPrestamo}
                                        name="nSeptimoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSeptimoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nOctavoPrestamo}
                                        name="nOctavoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoOctavoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'> {
                                       (parseInt(estimaSeleccionada.montoPrimerPrestamo) +
                                       parseInt(estimaSeleccionada.montoSegundoPrestamo) +
                                       parseInt(estimaSeleccionada.montoTercerPrestamo) +
                                       parseInt(estimaSeleccionada.montoCuartoPrestamo) +
                                       parseInt(estimaSeleccionada.montoQuintoPrestamo) +
                                       parseInt(estimaSeleccionada.montoSextoPrestamo) +
                                       parseInt(estimaSeleccionada.montoSeptimoPrestamo) +
                                       parseInt(estimaSeleccionada.montoOctavoPrestamo) ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                } </td>
                                <td className='border border-slate-300'> {
                                    parseInt(estimaSeleccionada.nPrimerPrestamo) +
                                    parseInt(estimaSeleccionada.nSegundoPrestamo) +
                                    parseInt(estimaSeleccionada.nTercerPrestamo) +
                                    parseInt(estimaSeleccionada.nCuartoPrestamo) +
                                    parseInt(estimaSeleccionada.nQuintoPrestamo) +
                                    parseInt(estimaSeleccionada.nSextoPrestamo) +
                                    parseInt(estimaSeleccionada.nSeptimoPrestamo) +
                                    parseInt(estimaSeleccionada.nOctavoPrestamo) 
                                } </td>

                                
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                : null
            }

            {
                nuevaEstimaForm 
                ?
                <div className='m-5'>
                    
                    <Button className='mb-5' type='button' variant="contained" size="small" onClick={(e) => {onGuardar(e, estimaSeleccionada)}} startIcon={<SendIcon />}>Guardar estimas</Button>
                    
                    <Button 
                        className='mb-5' 
                        type='button' 
                        variant="contained" 
                        size="small" 
                        onClick={(e) => {onCancelarEdit(e)}} 
                        startIcon={<CancelIcon />}
                    >
                        Cancelar
                    </Button>
                    <Autocomplete
                        style={{width : '25%', marginTop: "12px" }}
                        options={minicipios}
                        getOptionLabel={option => option.nombreMunicipio || ''}
                        onChange={(e, item) => { onSetMunicipioSeleccionado(e, item ) }}
                        renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio' />}
                    />

                    <TextField
                        label="Horario"
                        type="time"
                        value={estimaSeleccionada.horario}
                        format="HH:mm"
                        name="horario"
                        style={{width : '25%', marginTop: "12px" }}
                        onChange={handleChange}
                    ></TextField>
                    
                    <table className='w-full border-collapse border border-slate-400 mt-3'>
                        <thead>
                            <tr>
                                <th className='border border-slate-300'> 150 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 200 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 250 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 300 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 350 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 400 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 450 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300'> 500 </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> $ </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> Total  </th>
                                <th className='border border-slate-300' style={{ width: '60px' }}> TA </th>
                            </tr>
                        </thead>
        
                        <tbody>
                            <tr>
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nPrimerPrestamo}
                                        name="nPrimerPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoPrimerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSegundoPrestamo}
                                        name="nSegundoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSegundoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nTercerPrestamo}
                                        name="nTercerPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoTercerPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nCuartoPrestamo}
                                        name="nCuartoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoCuartoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nQuintoPrestamo}
                                        name="nQuintoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoQuintoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSextoPrestamo}
                                        name="nSextoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSextoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nSeptimoPrestamo}
                                        name="nSeptimoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoSeptimoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'>
                                    <TextField
                                        value={estimaSeleccionada.nOctavoPrestamo}
                                        name="nOctavoPrestamo"
                                        style={{ padding: '0px !important', width: '60px' }}
                                        onChange={handleChange}
                                    ></TextField>
                                </td>
                                <td className='border border-slate-300'> {estimaSeleccionada.montoOctavoPrestamo.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} </td>
                                
                                <td className='border border-slate-300'> {
                                       (parseInt(estimaSeleccionada.montoPrimerPrestamo) +
                                       parseInt(estimaSeleccionada.montoSegundoPrestamo) +
                                       parseInt(estimaSeleccionada.montoTercerPrestamo) +
                                       parseInt(estimaSeleccionada.montoCuartoPrestamo) +
                                       parseInt(estimaSeleccionada.montoQuintoPrestamo) +
                                       parseInt(estimaSeleccionada.montoSextoPrestamo) +
                                       parseInt(estimaSeleccionada.montoSeptimoPrestamo) +
                                       parseInt(estimaSeleccionada.montoOctavoPrestamo) ).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
                                } </td>
                                <td className='border border-slate-300'> {
                                    parseInt(estimaSeleccionada.nPrimerPrestamo) +
                                    parseInt(estimaSeleccionada.nSegundoPrestamo) +
                                    parseInt(estimaSeleccionada.nTercerPrestamo) +
                                    parseInt(estimaSeleccionada.nCuartoPrestamo) +
                                    parseInt(estimaSeleccionada.nQuintoPrestamo) +
                                    parseInt(estimaSeleccionada.nSextoPrestamo) +
                                    parseInt(estimaSeleccionada.nSeptimoPrestamo) +
                                    parseInt(estimaSeleccionada.nOctavoPrestamo) 
                                } </td>

                                
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                : null
            }

        </div>
    )
}
