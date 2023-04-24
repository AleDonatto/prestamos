import React, { useState, useEffect } from 'react'
import { Button, TextField, Autocomplete, Select, MenuItem, FormControl } from '@mui/material';
import {ListadoEstimasMunicipiosDia} from "@/Components/pruebas/ListadoEstimasMunicipiosDia"
import axios from 'axios';

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

    
    const [estimasPorDia, setEstimasPorDia] = useState({
        lunes : [
        ],
        martes : [
        ],
        miercoles : [
        ],
        jueves : [
        ],
        viernes : [
        ],
    }) 

    
    const [estimasPorDiaSeleccionado, setEstimasPorDiaSeleccionado] = useState([]);
    const [fechaInicio, setFechaInicio] = useState('')
    const [fechaFin, setFechaFin] = useState('')
    const [hayEstimaEnLaSemana, setHayEstimaEnLaSemana] = useState(false)
    const [mostrarEditar, setMostrarEditar] = useState(false)
    const [diaSeleccionadoStr, setDiaSeleccionadoStr] = useState("")
    const [idEstimaSeleccionada, setIdEstimaSeleccionada] = useState(null)

    const getEstimas = (fechaInicio, fechaFin) =>  {
        setHayEstimaEnLaSemana(false)
        setIdEstimaSeleccionada(0)
        setEstimasPorDia({
            lunes : [
            ],
            martes : [
            ],
            miercoles : [
            ],
            jueves : [
            ],
            viernes : [
            ],
        })
        axios.post('/estimas', {
            fechaInicio, 
            fechaFin
        }).then( (res) => {
            setHayEstimaEnLaSemana(res.data.hayEstimaRegistrada)
            setIdEstimaSeleccionada(res.data.idEstima)
            if(res.data.hayEstimaRegistrada) {
                setEstimasPorDia({
                    lunes : res.data.estimasDias.lunes,
                    martes : res.data.estimasDias.martes,
                    miercoles : res.data.estimasDias.miercoles,
                    jueves : res.data.estimasDias.jueves,
                    viernes : res.data.estimasDias.viernes,
                })
            }
        }).catch( () => {

        });
    }

    const getEstimasPDF = (fechaInicio, fechaFin) => {
        axios.post('/estimas-semana-pdf', {idEstima : idEstimaSeleccionada}, { 
            headers: { 'Content-Type': 'multipart/form-data' },
            'responseType': 'blob' 
          })
          .then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporteEstimas.pdf');
            document.body.appendChild(link);
            link.click();
          })
          .catch( err => {
            console.log(err.response)
          })
    }

    const fechasDeSemana = () => {
        let currentDate = new Date();
        
        //Funcionalidad para obtener el numero de semana actual
        Date.prototype.getWeek = function() {
            let firstDayOfYear = new Date(this.getFullYear(), 0, 1);
            let pastDaysOfYear = (this - firstDayOfYear) / 86400000;
            return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
        };
        let currentWeek = currentDate.getWeek() - 1;
        
        //Fecha del lunes de la semana obtenida
        let firstDayOfWeek = new Date(currentDate.getFullYear(), 0, (currentWeek - 1) * 7 + 2);
        //Fecha del viernes de la semana obtenida
        let lastDayOfWeek = new Date(currentDate.getFullYear(), 0, (currentWeek - 1) * 7 + 6);
        
        // formato de Date a YYYY-MM-DD
        let inicio = firstDayOfWeek.toISOString().slice(0, 10);
        let fin = lastDayOfWeek.toISOString().slice(0, 10);

        setFechaInicio(inicio);
        setFechaFin(fin);

        return {
            inicio,
            fin
        }
    }

    const showEditarEstimas = (valores, dia) => {
        setDiaSeleccionadoStr(dia)
        setMostrarEditar(true)
        setEstimasPorDiaSeleccionado(valores)
    }

    const generateEstimas = async  () => {        
        await axios.post('/estimas-generate', {
            fechaInicio, 
            fechaFin
        }).then( (res) => {
            if(res.data.status) {
                getEstimas(fechaInicio, fechaFin)
                setHayEstimaEnLaSemana(true)
            }
        }).catch( () => {

        });
    }

    useEffect(() => {
        //Get fechas YYYY-MM-DD Current Date
        let fechas = fechasDeSemana()

        getEstimas(fechas.inicio, fechas.fin)
    }, []);
    
    return (
        <div>
            <div className='mt-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
                <div>
                    <p className='text-base md:text-lg lg:text-xl font-semibold text-gray-600 mb-4'>Crear Estima</p>
                    <div className='grid grid-cols-4 gap-4'>
                        <div>
                            <label htmlFor="">Fecha de Incio</label>
                            <TextField label="" name='grupoText' type='date' value={fechaInicio} onChange={(val) => {setFechaInicio(val.target.value)}} className="outline-0 focus:border-0"></TextField>
                        </div>
                        <div>
                            <label htmlFor="">Fecha Final</label>
                            <TextField label="" name='grupoText' type='date' value={fechaFin} onChange={(val) => {setFechaFin(val.target.value)}} className="outline-0 focus:border-0"></TextField>
                        </div>
                        <div className='ml-5 pt-5' >
                            <Button variant="outlined" type='submit' onClick={() => {getEstimas(fechaInicio, fechaFin)}} >Consultar Estima</Button>
                        </div>
                        <div className='ml-5 pt-5' >
                            <Button variant="outlined" type='submit' onClick={() => {getEstimasPDF(fechaInicio, fechaFin)}} >Descargar reporte</Button>
                        </div>
                    </div>
                </div>
            </div>
                
            {
                hayEstimaEnLaSemana 
                ?
                <div className='mt-5 grid grid-cols-1 gap-4'>
                    <ListadoEstimasMunicipiosDia
                        tituloDia={"Lunes"}
                        idEstima={idEstimaSeleccionada}
                        semanaTitulo={fechaInicio  +' al '+ fechaFin}
                        showEstima={(values) => {showEditarEstimas(values, "Lunes")}}
                        estimas={estimasPorDia.lunes}
                    />

                    <ListadoEstimasMunicipiosDia
                        tituloDia={"Martes"}
                        idEstima={idEstimaSeleccionada}
                        semanaTitulo={fechaInicio  +' al '+ fechaFin}
                        showEstima={(values) => {showEditarEstimas(values, "Martes")}}
                        estimas={estimasPorDia.martes}
                    />

                    <ListadoEstimasMunicipiosDia
                        tituloDia={"Miercoles"}
                        idEstima={idEstimaSeleccionada}
                        semanaTitulo={fechaInicio  +' al '+ fechaFin}
                        showEstima={(values) => {showEditarEstimas(values, "Miercoles")}}
                        estimas={estimasPorDia.miercoles}
                    />

                    <ListadoEstimasMunicipiosDia
                        tituloDia={"Jueves"}
                        idEstima={idEstimaSeleccionada}
                        semanaTitulo={fechaInicio  +' al '+ fechaFin}
                        showEstima={(values) => {showEditarEstimas(values, "Jueves")}}
                        estimas={estimasPorDia.jueves}
                    />

                    <ListadoEstimasMunicipiosDia
                        tituloDia={"Viernes"}
                        idEstima={idEstimaSeleccionada}
                        semanaTitulo={fechaInicio  +' al '+ fechaFin}
                        showEstima={(values) => {showEditarEstimas(values, "Viernes")}}
                        estimas={estimasPorDia.viernes}
                    />
                </div>
                :
                <div className='mt-5 mb-5'>
                    <div className='mt-5 flex flex-row mt-5'>
                        <div className='basis-1/4'></div>
                        <div className='basis-2/4 flex justify-center'>
                            <p>En la semana selecionada no hay estimas generadas, ¿Desea generar una estima para la semana?</p> 
                        </div>
                        <div className='basis-1/4'></div>
                    </div>
                    <div className='mt-5 flex flex-row'>
                        <div className='basis-1/4'></div>
                        <div className='basis-2/4 flex justify-center'>
                            <Button variant="outlined" type='button' onClick={() => {generateEstimas()}}>Generar estimas para los dias seleccionados</Button>
                        </div>
                        <div className='basis-1/4'></div>
                    </div>
                </div>
            }
            
        </div>
    )
}
