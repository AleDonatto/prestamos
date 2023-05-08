import React, { useEffect, useRef, useState } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2'
import moment from 'moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const FormClientesRenovacion = (props) => {

    const listPlazos = [
        <MenuItem value={10} key={10+1}>{10}</MenuItem>,
        <MenuItem value={14} key={14+1}>{14}</MenuItem>
    ]
    
    const [disableClient, setdisableClient] = useState(true)
    
    const [disableAval, setdisableAval] = useState(true)
    const [municipios, setmunicipios] = useState([])
    const [defMunicipio, setdefMunicipio] = useState(null)
    const [grupos, setgrupos] = useState([])
    const [prestamo, setPrestamo] = useState(0)
    const [plazos, setPlazos] = useState(0)
    const [grupoNuevo, setGrupoNuevo] = useState('')
    const [municipio, setmunicipio] = useState('')
    const [pagosFaltantes, setPagosFaltantes] = useState(0)
    const [montoFaltante, setMontoFaltante] = useState(0)
    

    const date = moment().format()
    const [client, setclient] = useState({})

    const [aval, setaval] = useState({})

    const handleChangeCliente = (e) => {
        // console.log(e.target.name ,' - ', e.target.value)
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
            // console.log(res.data)
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

        if(prestamo <= 0) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Registra el monto del prestamo',
                showConfirmButton: false,
                timer: 1500
            })
            return false;

        }

        if(grupoNuevo == '') {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Registra un grupo',
                showConfirmButton: false,
                timer: 1500
            })
            return false;
        }

        
        axios.get(`/grupos-show/${client.nombreGrupo}`)
        .then( res => {
            
            if(true){
                client.plazos         = plazos
                client.monto          = prestamo
                client.pagosFaltantes = pagosFaltantes
                client.montoFaltante  = montoFaltante
                client.capital  = prestamo - montoFaltante
                
                
                axios.post('/clientes-registrar-renovacion', {
                    client,
                    aval,
                    grupoNuevo : client.nombreGrupo
                })
                .then(res => {
                    if(res.data.status) {
                        props.closeForm(res.data.status)
                        generarControlPagos(res.data.idCliente)

                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: '',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
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
                
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'El grupo ya esta registrado, agregar uno nuevo',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleUpdateAval = (e) => {
        e.preventDefault()
        axios.post('/clientes/update/aval', aval)
        .then(res => {
            // console.log(res.data)
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

    const generarControlPagos = (idCliente) => {
        axios.get(`/generar-control-pago/${idCliente}`)
        .then(res => {

        })
        .catch( err => {
            console.log(err.response)
        })
    }

    const getDatosCliente = (idCliente) => {
        
        axios.get(`/clientes-edit/${idCliente}`)
        .then(res => {
            // console.log(res)
            setclient(res.data.cliente)
            setaval(res.data.aval)
        })
        .catch(err => {
            console.log(err.response)
        })
    } 

    const handlegetGrupos = async () => {
        axios.get('/grupos/list')
        .then(res => {
            // console.log(res.data)
            const dataresponse = res.data.grupos
            setgrupos(dataresponse)
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    const handleCloseForm = () => {
        props.closeForm(true)
    }

    useEffect(() => {
        handlegetGrupos()
        handlegetMunicipios()
    }, [])

    useEffect(() => {
        let plazosFaltantes = props.cliente.plazo - props.cliente.plazosPagados
        getDatosCliente(props.cliente.idCliente)
        setPagosFaltantes(plazosFaltantes)
        setMontoFaltante(plazosFaltantes * 200)
        setGrupoNuevo(props.cliente.nombreGrupo)
        setPlazos(props.cliente.plazo)
        setmunicipio(props.cliente.nombreMunicipio)
        
      }, []);

    
    
    return (
        <div>            
            
            
            <div className="-mx-3 mt-5 flex">
                <Button type='button' variant='contained' startIcon={<ArrowBackIcon />} onClick={handleCloseForm}>
                    Regresar
                </Button>
            </div>
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>Modificar datos de renovacion</h1>
                    <div className='mt-10'>
                        <form method='post' onSubmit={handleUpdateClient}  className='mt-10' >
                            <div className="">
                                <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Cliente</h1>
                            </div>
                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0"  InputLabelProps={{shrink: true,}}
                                    disabled={disableClient} value={client.nombre} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Apellido Paterno" name='apellido_paterno' className="w-full"  InputLabelProps={{shrink: true,}}
                                    disabled={disableClient} value={client.apellido_paterno} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='filled basic' label="Apellido Materno" name='apellido_materno' className='w-full' InputLabelProps={{shrink: true,}} 
                                    disabled={disableClient} value={client.apellido_materno} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="CURP" name='curp' className="w-full" InputLabelProps={{shrink: true,}}
                                    disabled={disableClient} value={client.curp} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Telefono" name='telefono' className="w-full" InputLabelProps={{shrink: true,}}
                                    disabled={disableClient} value={client.telefono} onChange={handleChangeCliente}/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Celular" name='celular' className='w-full' InputLabelProps={{shrink: true,}}
                                    value={client.celular} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id="" label="Estado" InputLabelProps={{shrink: true,}} name='estado' value={'Guerrero'} className="w-full" disabled/>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <Autocomplete
                                        disablePortal
                                        InputLabelProps={{shrink: true,}}
                                        options={municipios}
                                        defaultValue={municipio}
                                        getOptionLabel={option => option.nombreMunicipio||''}
                                        isOptionEqualToValue={option => option.idMunicipio === client.municipio}
                                        onChange={(e,item) => {
                                            setclient({
                                                ...client,
                                                municipio: item.idMunicipio
                                            })
                                            setmunicipio(item.nombreMunicipio)
                                        }}
                                        renderInput={(params) => 
                                            <TextField 
                                                className='border-0 border-none focus:border-none'
                                                {...params} 
                                                label="Municipio" 
                                                InputLabelProps={{shrink: true,}} 
                                                name='municipio' 
                                                value={municipio}
                                            ></TextField>
                                        }
                                    />
                                </div>
                                <div className='w-full px-3 sm:w-1/3'>
                                    <TextField id='' label="Poblado" name='poblado' className='w-full' InputLabelProps={{shrink: true,}}
                                    value={client.poblado} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>

                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Calle" name='calle' className='w-full'  InputLabelProps={{shrink: true,}}
                                    value={client.calle} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Referencias" name='referencias' className='w-full' InputLabelProps={{shrink: true,}}
                                    value={client.referencias} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField id='' label="Garantia" name='garantia' className='w-full' InputLabelProps={{shrink: true,}}
                                    value={client.garantia} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>
                            <div className='-mx-3 mt-5 flex flex-wrap'>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField label="Fecha Alta" name='diaAlta' 
                                    value={client.diaAlta} className='w-full' type="date" InputLabelProps={{shrink: true,}} onChange={handleChangeCliente}></TextField>
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField label="Grupo" name='nombreGrupo'
                                    value={client.nombreGrupo} className='w-full' type="number" InputLabelProps={{shrink: true,}} onChange={handleChangeCliente}></TextField>
                                </div>
                            </div>
                            
                            <div className='mt-5'>
                                <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Prestamo</h1>
                            </div>
                            <div className="-mx-3 mt-5 flex flex-wrap">
                                <div className="w-full px-3 sm:w-1/3">
                                    <TextField label="Prestamo" name='prestamo' className="w-full" min={0} value={prestamo} onChange={(val) => {  setPrestamo(val.target.value); }}></TextField>
                                    {  prestamo >= 2000 ? <span> El monto a recibir sera ${prestamo - montoFaltante} </span>: null  }
                                
                                </div>
                                <div className="w-full px-3 sm:w-1/3">
                                    <FormControl className='w-full'>
                                        <InputLabel id="plazos"  InputLabelProps={{shrink: true,}}>Plazos</InputLabel>
                                        <Select
                                            labelId="plazos" id="demo-simple-select" name='plazos'  InputLabelProps={{shrink: true,}}
                                            value={plazos} defaultValue={0} label="plazos" onChange={(val) => { setPlazos(val.target.value) }}
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
                        </form>
                    </div>
                </div>
            </div>

            <div className='bg-white mt-2 overflow-hidden shadow-sm sm:rounded-lg'>
                <div className='p-6 text-gray-900'>
                    <form method="post" onSubmit={handleUpdateAval}>
                        <div className="-mx-3 mt-5 flex justify-center">
                            <Button type='button' variant='contained'  onClick={() => {setdisableAval(!disableAval)}}>
                                Editar aval
                            </Button>
                        </div>
                        <div className='mt-10'>
                            <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Aval</h1>
                        </div>
                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0"  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.nombre} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Apellido Paterno"  name='apellido_paterno' className="w-full"  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.apellido_paterno} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id='' label="Apellido Materno" name='apellido_materno' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.apellido_materno} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="CURP" name='curp' className="w-full"  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.curp} onChange={handleChangeAval}/>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" label="Telefono" name='telefono' className="w-full"  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.telefono} onChange={handleChangeAval} />
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id='' label="Celular" name='celular' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.celular} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField id="" value={aval.estado} label="Estado" name='estado'  InputLabelProps={{shrink: true,}} className="w-full" disabled onChange={handleChangeAval}/>
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
                                <TextField id='' label="Poblado" name='poblado' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.poblado} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>

                        <div className="-mx-3 mt-5 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Calle" name='calle' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.calle} onChange={handleChangeAval}></TextField>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Referencias" name='referencias' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.referencias} onChange={handleChangeAval}></TextField>
                            </div>
                            <div className="w-full px-3 sm:w-1/3">
                                <TextField label="Garantia" name='garantia' className='w-full'  InputLabelProps={{shrink: true,}}
                                disabled={disableAval} value={aval.garantia} onChange={handleChangeAval}></TextField>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div>
            
                <div className="-mx-3 mt-5 flex justify-center">
                    <Button type='button' variant='contained'  onClick={handleUpdateClient}>
                        Registrar renovación
                    </Button>
                </div>
            </div>
        </div>
    )
}
