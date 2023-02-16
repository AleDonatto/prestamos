import React, { useEffect, useRef, useState } from 'react'
import municipios from '../Municipios/estados-municipios.json'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';


export const FormClientes = () => {
    
    const [grupos, setGrupos] = useState([]);
    const [cliente, setcliente] = useState({
        grupo: 0,
        plazos: '',
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
    }, [])

    const [showForm, setshowForm] = useState(false)
    const hanleShowForm = () => {
        //showForm.current = true
        //console.log(showForm)
        setshowForm(true)
    }

    const handleCloseGroup = () => {
        setshowForm(false)
    }
    
    return (
        <div>

            <div className='mt-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div>
                    <form action="">
                        <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Crear Nuevo grupo</p>
                        <div className='flex flex-grap mt-4'>
                            <div>
                                <TextField label="Grupo" className="outline-0 focus:border-0" disabled={showForm}></TextField>
                            </div>
                            <div className='ml-5 mt-2' >
                                <Button variant="outlined" type='submit' disabled={showForm}>Crear Grupo</Button>
                                <Button variant='outlined' type="button" onClick={hanleShowForm}>Crear</Button>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Seleccionar grupo existente</p>
                    <div className='flex flex-grap mt-4'>
                        <div className=''>
                            <FormControl className='w-40'>
                                <InputLabel id="grupo">Age</InputLabel>
                                <Select
                                    labelId="grupo" id="demo-simple-select" name='grupo'
                                    value={cliente.grupo} label="Age" onChange={handleChange}
                                    disabled={showForm}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={0}>Ten</MenuItem>
                                    <MenuItem value={1}>Twenty</MenuItem>
                                    <MenuItem value={2}>Thirty</MenuItem>
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
                <form action="" className='mt-10' >
                    <div className="">
                        <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Cliente</h1>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Nombre" className="w-full outline-0 focus:border-0"/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Apellido Paterno" className="w-full" />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='filled basic' label="Apellido Materno" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="CURP" className="w-full"/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Telefono" className="w-full" />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Celular" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Estado" className="w-full" disabled/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <Autocomplete
                                disablePortal
                                id=""
                                options={municipios.Guerrero}
                                renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" />}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Calle" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Referencias" className='w-full'></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Garantia" className='w-full'></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <FormControl className='w-full'>
                                <InputLabel id="plazos">Plazos</InputLabel>
                                <Select
                                    labelId="plazos" id="demo-simple-select" name='plazos'
                                    value={cliente.plazos} label="plazos" onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {listPlazos}
                                </Select>
                            </FormControl>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Monto" className='w-full'></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Fecha Alta"  className='w-full' type="date" InputLabelProps={{shrink: true,}}></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                        </div>
                    </div>

                    <div className='mt-10'>
                        <h1 className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Datos Aval</h1>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Nombre" className="w-full outline-0 focus:border-0"/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Apellido Paterno" className="w-full" />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='filled basic' label="Apellido Materno" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="CURP" className="w-full"/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Telefono" className="w-full" />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Celular" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id="" label="Estado" className="w-full" disabled/>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <Autocomplete
                                disablePortal
                                id=""
                                options={municipios.Guerrero}
                                renderInput={(params) => <TextField className='border-0 border-none focus:border-none' {...params} label="Municipio" />}
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Calle" className='w-full'></TextField>
                        </div>
                    </div>

                    <div className="-mx-3 mt-5 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Referencias" className='w-full'></TextField>
                        </div>
                        <div className="w-full px-3 sm:w-1/3">
                            <TextField id='' label="Garantia" className='w-full'></TextField>
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
