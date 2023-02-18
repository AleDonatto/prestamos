import React, { useEffect, useRef, useState } from 'react'
import municipios from '../Municipios/estados-municipios.json'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import Swal from 'sweetalert2'
import moment from 'moment';


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
        municipio: '',
        garantia: '',
        //fecha_acreditacion: date.toISOString("es-MX", {timeZone: "America/Mexico_City"}).split(',')[0],
        fecha_acreditacion: date.split('T')[0],
        nombre_aval: '',
        apellido_paterno_aval: '',
        apellido_materno_aval: '',
        curp_aval: '',
        telefono_aval: '',
        celular_aval: '',
        municipio_aval: '',
        referencias_aval: '',
        garantia_aval: '',
        grupo: 0,
        grupoText: '',
        plazos: 14,
        monto: 2000
    })

    const listPlazos = []
    for (let index = 0; index < 14; index++) {
        listPlazos.push(<MenuItem value={index+1} key={index+1}>{index+1}</MenuItem>)
    }

    const handleChange = (e) => {
        setcliente({
            ...cliente,
            [e.target.name] : e.target.value
        });
    };

    useEffect(() => {
        handlelistGrupos()
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
            console.log(res.data)
            const listGruposData = res.data.grupos
            setGrupos(listGruposData)
        })
        .catch(err => {
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

    const handleCreateCliente = (e) => {
        e.preventDefault()
        axios.post('/clientes/create', cliente)
        .then(res => {
            console.log(res.data)
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Cliente Ageragado',
                showConfirmButton: false,
                timer: 1500
            })
            handleResetValues()
        })
        .catch( err => {
            console.log(err.response)
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
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
            municipio: '',
            garantia: '',
            fecha_acreditacion: date.split('T')[0],
            nombre_aval: '',
            apellido_paterno_aval: '',
            apellido_materno_aval: '',
            curp_aval: '',
            telefono_aval: '',
            celular_aval: '',
            municipio_aval: '',
            referencias_aval: '',
            garantia_aval: '',
            plazos: 14,
            monto: 2000
        })
    }
    
    return (
        <div>
            <pre>{JSON.stringify(cliente.fecha_acreditacion)}</pre>
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
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        grupos.map((item, index) => (
                                            <MenuItem value={item.idGrupo} key={'grupo'+item.idGrupo}>{item.nombreGrupo}</MenuItem>
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
                <form method='post' onSubmit={handleCreateCliente} className='mt-10' >
                    <div className="">
                        <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Cliente</h1>
                    </div>
                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Nombre" name='nombre' className="w-full outline-0 focus:border-0" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Apellido Paterno" name='apellido_paterno' className="w-full" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='filled basic' label="Apellido Materno" name='apellido_materno' className='w-full' onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="CURP" name='curp' className="w-full" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Telefono" name='telefono' className="w-full" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Celular" name='celular' className='w-full' onChange={handleChange}></TextField>
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
                                options={municipios.Guerrero}
                                renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio' onSelect={handleChange}/>}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Calle" name='calle' className='w-full' onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Referencias" name='referencias' className='w-full' onChange={handleChange}></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Garantia" name='garantia' className='w-full' onChange={handleChange}></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Fecha Alta" name='fecha_acreditacion' value={cliente.fecha_acreditacion} className='w-full' type="date" InputLabelProps={{shrink: true,}} onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className='mt-10'>
                        <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Aval</h1>
                    </div>
                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Nombre" name='nombre_aval' className="w-full outline-0 focus:border-0" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Apellido Paterno"  name='apellido_paterno_aval' className="w-full" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='filled basic' label="Apellido Materno" name='apellido_materno_aval' className='w-full' onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="CURP" name='curp_aval' className="w-full" onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Telefono" name='telefono_aval' className="w-full" onChange={handleChange} />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Celular" name='celular_aval' className='w-full' onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" value={cliente.estado} label="Estado" name='estado_aval' className="w-full" disabled onChange={handleChange}/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <Autocomplete
                                disablePortal
                                id=""
                                options={municipios.Guerrero}
                                renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" name='municipio_aval' onSelect={handleChange} />}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField label="Calle" name='calle_aval' className='w-full' onChange={handleChange}></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField label="Referencias" name='referencias_aval' className='w-full' onChange={handleChange}></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField label="Garantia" name='garantia_aval' className='w-full' onChange={handleChange}></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                        </div>
                    </div>

                    <div className='mt-10'>
                        <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Prestamo</h1>
                    </div>
                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Monto" name='monto' className='w-full' value={cliente.monto} onChange={handleChange}></TextField>
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
                            <Button type='submit' variant="contained">Agregar Cliente</Button>
                        </div>
                    </div>
                </form>
                :
                <div></div>
            }
        </div>
    )
}
