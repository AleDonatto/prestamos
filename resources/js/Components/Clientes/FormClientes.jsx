import React, { useEffect, useRef, useState } from 'react'
//import municipios from '../Municipios/estados-municipios.json'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2'
import moment from 'moment';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import AutocompleteJoy from '@mui/joy/Autocomplete';
import ModalProgress from '../Utils/ModalProgress'

export const FormClientes = () => {
    
    const [grupos, setGrupos] = useState([]);
    const date = moment().format()
    const [cliente, setcliente] = useState({
        nombre: '',
        apellido_paterno: '',
        apellido_materno: '',
        curp: '',
        telefono: '',
        celular: '',
        estado: 'Guerrero',
        municipio: 0,
        poblado: '',
        calle: '',
        referencias: '',
        garantia: '',
        //fecha_acreditacion: date.toISOString("es-MX", {timeZone: "America/Mexico_City"}).split(',')[0],
        fecha_acreditacion: date.split('T')[0],
        nombre_aval: '',
        apellido_paterno_aval: '',
        apellido_materno_aval: '',
        curp_aval: '',
        telefono_aval: '',
        celular_aval: '',
        municipio_aval: 0,
        poblado_aval: '',
        calle_aval: '',
        referencias_aval: '',
        garantia_aval: '',
        grupo: 0,
        grupoText: '',
        plazos: 14,
        monto: 2000
    })
    const [municipios, setmunicipios] = useState([])
    const [disableSubmit, setdisableSubmit] = useState(false)

    const [value, setValue] = React.useState(municipios[0]);
    const [inputValue, setInputValue] = React.useState('');
    
    const [valueAval, setValueAval] = React.useState(municipios[0]);
    const [inputValueAval, setInputValueAval] = React.useState('');

    const listPlazos = [
        <MenuItem value={10} key={10+1}>{10}</MenuItem>,
        <MenuItem value={14} key={14+1}>{14}</MenuItem>
    ]

    const handleChange = (e) => {
        setcliente({
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    useEffect(() => {
        handlelistGrupos()
        handlelistMunicipios()
    }, [])

    const [showForm, setshowForm] = useState(false)
    const handleSelectGrupo = (e) => {
        //showForm.current = true
        //console.log(showForm)
        setcliente({
            ...cliente,
            [e.target.name] : e.target.value
        });
        setshowForm(true)
    }

    const handleShowForm = () => {
        setshowForm(true)
    }

    const handleCloseGroup = () => {
        setshowForm(false)
    }

    const handlelistGrupos = async () => {
        await axios.get('/grupos/list')
        .then(res => {
            //console.log(res.data)
            const listGruposData = res.data.grupos
            setGrupos(listGruposData)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handlelistMunicipios = () => {
        axios.get('/municipios/list')
        .then(res => {
            //console.log(res.data)
            const list = res.data.listMunicipios
            setmunicipios(list)
        })
        .catch( err => {
            console.log(err.response)
        })
    }

    const handleCreateGrupo = (e) => {
        e.preventDefault()

        const data = {
            nombreGrupo: cliente.grupoText
        }

        axios.post('/grupos/create', data)
        .then(res => {
            console.log(res.data)

            setcliente({
                ...cliente,
                grupo: res.data.newGrupo.idGrupo
            })

            const listGruposData = res.data.listGrupo
            setGrupos(listGruposData)
            setshowForm(true)

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Grupo Creado',
                showConfirmButton: false,
                timer: 1500
            })
        })
        .catch(err => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            console.log(err.response)
        })
    }

    const generarControlPagos = (idCliente) => {
        axios.get(`/generar-control-pago/${idCliente}`)
        .then(res => {

        })
        .catch( err => {
            console.log(err.response)
        })
    }

    const handleCreateCliente =  async (e) => {
        e.preventDefault()
        setdisableSubmit(true)
        await axios.post('/clientes/create', cliente)
        .then(res => {
            console.log(res.data)

            Swal.fire({
                position: 'top-end',
                icon: res.data.status,
                title: res.data.message,
                showConfirmButton: false,
                timer: 10000
            })

            if(res.data.status === 'success'){
                let idCliente = res.data.idCliente
                console.log(idCliente) 
                generarControlPagos(idCliente)
                handleResetValues()
                setInputValue('')
                setInputValueAval('')
            }
            setdisableSubmit(false)
        })
        .catch( err => {
            console.log(err)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err,
                showConfirmButton: false,
                timer: 10000
            })
            setdisableSubmit(false)
        })
    }

    const handleResetValues = () =>{
        setcliente({
            ...cliente,
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            curp: '',
            telefono: '',
            celular: '',
            //municipio: '',
            poblado: '',
            calle: '',
            referencias: '',
            garantia: '',
            fecha_acreditacion: date.split('T')[0],
            nombre_aval: '',
            apellido_paterno_aval: '',
            apellido_materno_aval: '',
            curp_aval: '',
            telefono_aval: '',
            celular_aval: '',
            //municipio_aval: '',
            poblado_aval: '',
            calle_aval: '',
            referencias_aval: '',
            garantia_aval: '',
            plazos: 14,
            monto: 2000
        })
    }

    const handlenumber = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setcliente({
                ...cliente,
                [e.target.name]: e.target.value
            })
        }
    }
    const form = useRef()
    
    return (
        <div>
            <div className='mt-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div>
                    <form method='post' onSubmit={handleCreateGrupo}>
                        <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Crear Nuevo grupo</p>
                        <div className='flex flex-grap mt-4'>
                            <div>
                                <TextField label="Grupo" name='grupoText' className="outline-0 focus:border-0" disabled={showForm} value={cliente.grupoText} onChange={handleChange}></TextField>
                            </div>
                            <div className='ml-5 mt-2' >
                                <Button variant="outlined" type='submit' disabled={showForm}>Crear Grupo</Button>
                                {/*<Button variant='outlined' type="button" onClick={handleShowForm}>Crear</Button>*/}
                            </div>
                            
                        </div>
                    </form>
                </div>
                <div>    
                    <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>O seleccionar grupo existente</p>
                    <div className='flex flex-grap mt-4'>
                        <div className=''>
                            <FormControl className='w-40'>
                                <InputLabel id="grupo">Grupo</InputLabel>
                                <Select name='grupo' value={cliente.grupo} defaultValue={0} label="Grupo"
                                    disabled={showForm} onChange={handleSelectGrupo}
                                >
                                    <MenuItem value={0}>
                                        <em>Seleccione</em>
                                    </MenuItem>
                                    {
                                        grupos.map((item, index) => (
                                            <MenuItem value={item.idGrupo} key={'grupo'+item.idGrupo}>{item.idGrupo}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                        <div className='ml-5 mt-2'>
                            <Button variant="outlined" type='button' disabled={showForm}>Seleccionar Grupo</Button>
                        </div>
                    </div>
                </div>

                { showForm ? 
                    <div>
                        <Button type='button' variant='contained' color='success' onClick={handleCloseGroup}>Cerrar Grupo</Button>
                    </div>
                    :
                    <div></div>
                }
            </div>
            
            {showForm ? 
                <div>
                    <ModalProgress show={disableSubmit} />
                    <ValidatorForm onSubmit={handleCreateCliente}  onError={error => console.log(error)} className='mt-10' >
                        <div className="">
                            <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Cliente</h1>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0" value={cliente.nombre} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Apellido Paterno" name='apellido_paterno' className="w-full" value={cliente.apellido_paterno} onChange={handleChange}
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='filled basic' label="Apellido Materno" name='apellido_materno' className='w-full' value={cliente.apellido_materno} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="CURP" name='curp' className="w-full" value={cliente.curp} onChange={handleChange} 
                                validators={['required', 'matchRegexp:[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?']} 
                                errorMessages={['Este campo es requerido', 'CURP no valida']}
                                inputProps={{ maxLength: 20 }}/>
                            </div>
                            {/*<div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Telefono" name='telefono' className="w-full" value={cliente.telefono} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 10 }}/>
                            </div>*/}
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Celular" name='celular' className='w-full' value={cliente.celular} onChange={handlenumber}
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 10 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Estado" name='estado' value={'Guerrero'} className="w-full" disabled/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <AutocompleteJoy 
                                    options={municipios}
                                    placeholder="Municipio"
                                    getOptionLabel={option => option.nombreMunicipio || ''}
                                    onChange={(e,item) => { setcliente({
                                        ...cliente,
                                        municipio: item.idMunicipio
                                    }) }}
                                    value={value}
                                    inputValue={inputValue}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValue(newInputValue);
                                    }}
                                ></AutocompleteJoy>
                                {/*<Autocomplete
                                    disablePortal
                                    id=""
                                    options={municipios}
                                    getOptionLabel={option => option.nombreMunicipio||''}
                                    onChange={(e,item) => { setcliente({
                                        ...cliente,
                                        municipio: item.idMunicipio
                                    }) }}
                                    renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio"/>}
                                />*/}
                            </div>
                            <div className='w-full px-3 sm:w-1/3'>
                                <TextValidator id='' label="Colonia" name='poblado' className='w-full' value={cliente.poblado} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Calle" name='calle' className='w-full' value={cliente.calle} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Referencias" name='referencias' className='w-full' value={cliente.referencias} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 100 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Garantia" name='garantia' className='w-full' value={cliente.garantia} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>
                        <div className='-mx-3 mt-5 flex flex-wrap'>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Fecha Alta" name='fecha_acreditacion' value={cliente.fecha_acreditacion} className='w-full' type="date" InputLabelProps={{shrink: true,}} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} />
                            </div>
                        </div>

                        <div className='mt-10'>
                            <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Aval</h1>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Nombre" name='nombre_aval' className="w-full outline-0 focus:border-0" value={cliente.nombre_aval} onChange={handleChange}
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Apellido Paterno"  name='apellido_paterno_aval' className="w-full" value={cliente.apellido_paterno_aval} onChange={handleChange}
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Apellido Materno" name='apellido_materno_aval' className='w-full' value={cliente.apellido_materno_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="CURP" name='curp_aval' className="w-full" value={cliente.curp_aval} onChange={handleChange} 
                                validators={['required', 'matchRegexp:[\A-Z]{4}[0-9]{6}[HM]{1}[A-Z]{2}[BCDFGHJKLMNPQRSTVWXYZ]{3}([A-Z]{2})?([0-9]{2})?']} 
                                errorMessages={['Este campo es requerido', 'CURP no valida']}
                                inputProps={{ maxLength: 20 }}/>
                            </div>
                            {/*<div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" label="Telefono" name='telefono_aval' className="w-full" value={cliente.telefono_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']}/>
                            </div>*/}
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Celular" name='celular_aval' className='w-full' value={cliente.celular_aval} onChange={handlenumber} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 10 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id="" value={cliente.estado} label="Estado" name='estado_aval' className="w-full" disabled onChange={handleChange}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <AutocompleteJoy options={municipios}
                                    placeholder="Municipio"
                                    getOptionLabel={option => option.nombreMunicipio}
                                    onChange={(e,item) => { setcliente({
                                        ...cliente,
                                        municipio_aval: item.idMunicipio
                                    }) }}
                                    value={valueAval}
                                    inputValue={inputValueAval}
                                    onInputChange={(event, newInputValue) => {
                                        setInputValueAval(newInputValue);
                                    }}
                                ></AutocompleteJoy>
                                {/*<Autocomplete
                                    disablePortal
                                    id=""
                                    options={municipios}
                                    getOptionLabel={option => option.nombreMunicipio||''}
                                    onChange={(e,item) => { setcliente({
                                        ...cliente,
                                        municipio_aval: item.idMunicipio
                                    }) }}
                                    renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio_aval' />}
                                />*/}
                            </div>
                            <div className='w-full px-3 sm:w-1/3'>
                                <TextValidator id='' label="Colonia" name='poblado_aval' className='w-full' value={cliente.poblado_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator label="Calle" name='calle_aval' className='w-full' value={cliente.calle_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator label="Referencias" name='referencias_aval' className='w-full' value={cliente.referencias_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 100 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator label="Garantia" name='garantia_aval' className='w-full' value={cliente.garantia_aval} onChange={handleChange} 
                                validators={['required']} errorMessages={['Este campo es requerido']} inputProps={{ maxLength: 40 }}/>
                            </div>
                        </div>

                        <div className='mt-10'>
                            <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Prestamo</h1>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextValidator id='' label="Monto" name='monto' className='w-full' value={cliente.monto} onChange={handleChange} inputProps={{ maxLength: 12 }}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <FormControl className='w-full'>
                                    <InputLabel id="plazos">Plazos</InputLabel>
                                    <Select
                                        labelId="plazos" id="demo-simple-select" name='plazos'
                                        value={cliente.plazos} defaultValue={0} label="plazos" onChange={handleChange}
                                    >
                                        <MenuItem value={0}>
                                            <em>None</em>
                                        </MenuItem>
                                        {listPlazos}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                            </div>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3">
                                <Button type='submit' variant="contained" disabled={disableSubmit}>Agregar Cliente</Button>
                            </div>
                        </div>
                    </ValidatorForm>
                </div>
                :
                <div></div>
            }
        </div>
    )
}
