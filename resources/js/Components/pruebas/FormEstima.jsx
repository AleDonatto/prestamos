import React, { useState } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';

export const FormEstima = () => {

    const auxdias = [
        {
            id: 1,
            dia: 'Lunes', 
            data: []
        },
        {
            id: 1,
            dia: 'Martes', 
            data: []
        },
        {
            id: 1,
            dia: 'Miercoles', 
            data: []
        },
        {
            id: 1,
            dia: 'Jueves', 
            data: []
        },
        {
            id: 1,
            dia: 'Viernes', 
            data: []
        },
    ]

    const [first, setfirst] = useState({
        id: 0,
        fechaInicio: '',
        fechaFin: '',
        dias: [
            {
                id: 1,
                dia: 'Lunes', 
                data: []
            },
            {
                id: 1,
                dia: 'Martes', 
                data: []
            },
            {
                id: 1,
                dia: 'Miercoles', 
                data: []
            },
            {
                id: 1,
                dia: 'Jueves', 
                data: []
            },
            {
                id: 1,
                dia: 'Viernes', 
                data: []
            },
        ]
    })

    const hadleAddEstima = (index) => {
        console.log(index)
        let aux = first.dias
        aux[index].data.push({
            can1: 0,
            can2: 0,
            can3: 0,
            can4: 0,
            can5: 0,
            can6: 0,
            can7: 0
        })

        setfirst({
            ...first,
            dias: aux
        })
    }


    return (
        <div>
            <div className='mt-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div>
                    <form method='post' >
                        <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600'>Crear Estima</p>
                        <div className='grid grid-cols-3 gap-4'>
                            <div>
                                <label htmlFor="">Fecha de Incio</label>
                                <TextField label="" name='grupoText' type='date' className="outline-0 focus:border-0"></TextField>
                            </div>
                            <div>
                                <label htmlFor="">Fecha FInal</label>
                                <TextField label="" name='grupoText' type='date' className="outline-0 focus:border-0"></TextField>
                            </div>
                            <div className='ml-5 pt-5' >
                                <Button variant="outlined" type='submit' >Crear Estima</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='mt-5 grid grid-cols-1 gap-4'>
                {
                    first.dias.map( (item, diasindex) => {
                        return (
                            <div key={'dias'+diasindex}>
                                <h4 className='font-semibold text-lg'>{item.dia}</h4>
                                <div className='grid grid-cols-10 gap-4'>
                                    <div>#</div>
                                    <div>Municipio</div>
                                    <div>150</div>
                                    <div>200</div>
                                    <div>250</div>
                                    <div>300</div>
                                    <div>350</div>
                                    <div>400</div>
                                    <div>450</div>
                                    <div>500</div>
                                </div>
                                {item.data.map((dtos, index) => {
                                    return (
                                        <div className='grid grid-cols-10 gap-4' key={'cant'+index}>
                                            <div>
                                                {index + 1}
                                            </div>
                                            <div>
                                                <Select className='outline-0 focus:border-0'></Select>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                            <div>
                                                <TextField label="" className="outline-0 focus:border-0"></TextField>
                                            </div>
                                        </div>
                                    )
                                })}
                                <div className='my-10'>
                                    <Button variant="outlined" type='button' onClick={() => hadleAddEstima(diasindex)}>Agregar Nuevo</Button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
