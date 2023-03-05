import React, { useEffect, useState } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2'
import moment from 'moment';
import { usePage } from '@inertiajs/react';

export const EditFormClient = (props) => {
    const { cliente } = usePage().props
    
    const [disableClient, setdisableClient] = useState(true)
    const [disableAval, setdisableAval] = useState(true)
    const [municipios, setmunicipios] = useState([])
    const [defMunicipio, setdefMunicipio] = useState(null)
    const [grupos, setgrupos] = useState([])

    const date = moment().format()
    const [client, setclient] = useState({
        idCliente: cliente.dataClient.idCliente,
        nombre: cliente.dataClient.nombre,
        apellido_paterno: cliente.dataClient.apellido_paterno,
        apellido_materno: cliente.dataClient.apellido_materno,
        curp: cliente.dataClient.curp,
        telefono: cliente.dataClient.telefono,
        celular: cliente.dataClient.celular,
        estado: 'Guerrero',
        municipio: cliente.dataClient.municipio_id,
        poblado: cliente.dataClient.poblado,
        calle: cliente.dataClient.calle,
        referencias: cliente.dataClient.referencias,
        garantia: cliente.dataClient.garantias,
        //fecha_acreditacion: date.toISOString("es-MX", {timeZone: "America/Mexico_City"}).split(',')[0],
        fecha_acreditacion: cliente.dataClient.diaAlta,
        grupo: cliente.dataClient.grupo_id
    })

    const [aval, setaval] = useState({
        idAval: cliente.dataAval?.idAval,
        nombre: cliente.dataAval?.nombre,
        apellido_paterno: cliente.dataAval?.apellido_paterno,
        apellido_materno: cliente.dataAval?.apellido_materno,
        curp: cliente.dataAval?.curp,
        telefono: cliente.dataAval?.telefono,
        celular: cliente.dataAval?.celular,
        estado: 'Guerrero',
        municipio: cliente.dataAval?.municipio_id,
        poblado: cliente.dataAval?.poblado,
        calle: cliente.dataAval?.calle,
        referencias: cliente.dataAval?.referencias,
        garantia: cliente.dataAval?.garantias,
    })

    const handleChangeCliente = (e) => {
        setclient({
            ...client,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeAval = (e) => {
        setaval({
            ...aval,
            [e.target.name]: e.target.value
        })
    }

    const handlegetMunicipios = () => {
        axios.get('/municipios/list')
        .then(res => {
            console.log(res.data)
            const list = res.data.listMunicipios
            setmunicipios(list)

            handlegetDefaultMun()
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleUpdateClient = (e) => {
        e.preventDefault()
        axios.post('/clientes/update/client', client)
        .then(res => {
            console.log(res.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            setdisableClient(!disableClient)
        })
        .catch(err => {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 10000
            })
        })
    }

    const handleUpdateAval = (e) => {
        e.preventDefault()
        axios.post('/clientes/update/aval', aval)
        .then(res => {
            console.log(res.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            })
            setdisableAval(!disableAval)
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

    const handlegetDefaultMun = () => {
        let aux = municipios

        let filter = aux.filter( item => item.idMunicipio === client.municipio )
        setdefMunicipio(filter)
    }

    const handlegetGrupos = async () => {
        axios.get('/grupos/list')
        .then(res => {
            console.log(res.data)
            const dataresponse = res.data.grupos
            setgrupos(dataresponse)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    useEffect(() => {
        handlegetGrupos()
        handlegetMunicipios()
    }, [])
    

    return (
        <div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>Modificar datos del cliente</h1>
                    <div className='mt-10'>
                        <form method='post' onSubmit={handleUpdateClient}  className='mt-10' >
                            <div className="">
                                <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Cliente</h1>
                            </div>
                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0" 
                                    disabled={disableClient} value={client.nombre} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Apellido Paterno" name='apellido_paterno' className="w-full" 
                                    disabled={disableClient} value={client.apellido_paterno} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='filled basic' label="Apellido Materno" name='apellido_materno' className='w-full' 
                                    disabled={disableClient} value={client.apellido_materno} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="CURP" name='curp' className="w-full" 
                                    disabled={disableClient} value={client.curp} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Telefono" name='telefono' className="w-full" 
                                    disabled={disableClient} value={client.telefono} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Celular" name='celular' className='w-full' 
                                    disabled={disableClient} value={client.celular} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Estado" name='estado' value={'Guerrero'} className="w-full" disabled/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <Autocomplete
                                        disablePortal
                                        id=""
                                        disabled={disableClient}
                                        options={municipios}
                                        getOptionLabel={option => option.nombreMunicipio||''}
                                        isOptionEqualToValue={option => option.idMunicipio === client.municipio}
                                        onChange={(e,item) => {
                                            setclient({
                                                ...client,
                                                municipio: item.idMunicipio
                                            })
                                        }}
                                        renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio'/>}
                                    />
                                </div>
                                <div className='w-full px-3 sm:w-1/3'>
                                    <TextField id='' label="Poblado" name='poblado' className='w-full' 
                                    disabled={disableClient} value={client.poblado} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Calle" name='calle' className='w-full' 
                                    disabled={disableClient} value={client.calle} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Referencias" name='referencias' className='w-full' 
                                    disabled={disableClient} value={client.referencias} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Garantia" name='garantia' className='w-full' 
                                    disabled={disableClient} value={client.garantia} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>
                            <div className='-mx-3 mt-5 flex flex-wrap'>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Fecha Alta" name='fecha_acreditacion' 
                                    disabled={disableClient} value={client.fecha_acreditacion} className='w-full' type="date" InputLabelProps={{shrink: true,}} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <FormControl fullWidth disabled={disableClient}>
                                        <InputLabel >Grupo</InputLabel>
                                            <Select
                                                value={client.grupo}
                                                name='grupo'
                                                onChange={handleChangeCliente}
                                            >
                                                <MenuItem value={0}>
                                                    <em>None</em>
                                                </MenuItem>
                                                {
                                                    grupos.map((item, index) => (
                                                        <MenuItem value={item.idGrupo} key={'grupo'+item.idGrupo}>{item.idGrupo}</MenuItem>
                                                    ))
                                                }
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="-mx-3 mt-5 flex">
                                <div className="px-3 ">
                                    <Button type='button' variant="contained" onClick={() => {setdisableClient(!disableClient)}}>
                                        { disableClient === true ? 'Editar' : 'Cancelar'}
                                    </Button>
                                </div>
                                <div className="px-3 ">
                                    <Button type='submit' color="success" disabled={disableClient} variant="contained">Guardar Datos Cliente</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='bg-white mt-10 overflow-hidden shadow-sm sm:rounded-lg'>
                <div className='p-6 text-gray-900'>
                    <form method="post" onSubmit={handleUpdateAval}>
                        <div className='mt-10'>
                            <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Aval</h1>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0" 
                                disabled={disableAval} value={aval.nombre} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Apellido Paterno"  name='apellido_paterno' className="w-full" 
                                disabled={disableAval} value={aval.apellido_paterno} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id='' label="Apellido Materno" name='apellido_materno' className='w-full' 
                                disabled={disableAval} value={aval.apellido_materno} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="CURP" name='curp' className="w-full" 
                                disabled={disableAval} value={aval.curp} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Telefono" name='telefono' className="w-full" 
                                disabled={disableAval} value={aval.telefono} onChange={handleChangeAval} />
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id='' label="Celular" name='celular' className='w-full' 
                                disabled={disableAval} value={aval.celular} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" value={aval.estado} label="Estado" name='estado' className="w-full" disabled onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <Autocomplete
                                    disablePortal
                                    id=""
                                    options={municipios}
                                    getOptionLabel={option => option.nombreMunicipio||''}
                                    isOptionEqualToValue={option => option.idMunicipio === aval.municipio}
                                    disabled={disableAval}
                                    onChange={(e,item) => {
                                        setaval({
                                            ...aval,
                                            municipio: item.idMunicipio
                                        })
                                    }}
                                    renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio' />}
                                />
                            </div>
                            <div className='w-full px-3 sm:w-1/3'>
                                <TextField id='' label="Poblado" name='poblado' className='w-full' 
                                disabled={disableAval} value={aval.poblado} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Calle" name='calle' className='w-full' 
                                disabled={disableAval} value={aval.calle} onChange={handleChangeAval}></TextField>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Referencias" name='referencias' className='w-full' 
                                disabled={disableAval} value={aval.referencias} onChange={handleChangeAval}></TextField>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Garantia" name='garantia' className='w-full' 
                                disabled={disableAval} value={aval.garantia} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex">
                            <div className="px-3">
                                <Button type='button' variant='contained' onClick={() => {setdisableAval(!disableAval)}}>
                                    { disableClient === true ? 'Editar' : 'Cancelar'}
                                </Button>
                            </div>
                            <div className="px-3">
                                <Button type='submit' color="success" disabled={disableAval} variant='contained'>Guardar datos aval</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
