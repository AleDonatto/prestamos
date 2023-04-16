import React, { useEffect, useState } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const ListadoEstimasMunicipiosDia = (props) => {
    
    const [estimasPorDia, setEstimasPorDia] = useState([]);
    const [estimaSeleccionada, setEstimaSeleccionada] = useState({});
    const [editarEstimaForm, setEditarEstimaForm] = useState(false);
    const [isEditar, setIsEditar] = useState(false);
    

    useEffect(() => {
        setEstimasPorDia(props.estimas)
    }, []);

    const onEditar = (e, registro) => {
        e.preventDefault()
        setEditarEstimaForm(true)
        setEstimaSeleccionada(registro)
    }

    const onGuardar = (e, registro) => {
        e.preventDefault()
        setEditarEstimaForm(false)
        
    }

    const regresar = (e) => {
        e.preventDefault()
        props.closeForm(true);
        
    }

    const onEliminar = (e, registro) => {
        e.preventDefault()
        setEstimaSeleccionada(registro)
    }

    const eliminarRegistro = (registro) => {

    } 
    
    const handleChange = (e) => {
        let propsMonto = calculateMonto(e.target.name,  e.target.value);

        setEstimaSeleccionada({
            ...estimaSeleccionada,
            [e.target.name] : e.target.value,
            [propsMonto.propMonto] : propsMonto.value,
            
        });

    };

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
            <div className='w-full border-solid border-2 p-5 rounded-md mt-5'>
                <div className='mt-5 flex flex-row mt-5'>
                    <div className='basis-3/4'>
                        <h2 className='font-black text-xl'>
                            {props.tituloDia}
                        </h2>
                    </div>
                    <div className='basis-1/4 p-1 grid justify-items-end'>
                    <Button variant="outlined" type='button' href={route('viewGetEstima', [props.idEstima, props.tituloDia] )} >Editar estimas</Button>
                    </div>
                </div>
                <table className='w-full border-collapse border border-slate-400'>
                    <thead>
                        <tr>
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
                            {
                                isEditar ? <th className='border border-slate-300'> Acciones </th> : null
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                    estimasPorDia.map( (estimaPorDia, indexEstimaDia) => {
                        return (
                            <tr key={'indexEstimaDia' + indexEstimaDia}>
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
                                {
                                    isEditar ? 
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
                                    : null
                                }
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
