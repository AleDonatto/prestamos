import React, { useEffect, useRef, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { Button, TextField } from '@mui/material';
import { ListClientesCreditos } from '@/Components/Clientes/ListClientesCreditos';
import Swal from 'sweetalert2'

const AplicacionPago = (props) => {

    const [pagosAplicar, setPagosAplicar] = useState(1);
    const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
    const [onReload, setOnReload] = useState(false);
    const [formIsOpen, setFormIsOpen] = useState(false);
    const [desactivarBtnAplicar, setDesactivarBtnAplicar] = useState(false);
    
    

    const handleAplicarPagos = async () => {
        let sobrepasanLosPagosRestantes = false
        setDesactivarBtnAplicar(true)

        if( pagosAplicar > 0 && clientesSeleccionados.length > 0 ){
            clientesSeleccionados.forEach( (value) => {
                let pagosRestantes = (value.plazo - value.plazosPagados)
                if( pagosRestantes < pagosAplicar){
                    console.error('Los pagos a aplicar sobrepasan los pagos que restan')
                    sobrepasanLosPagosRestantes = true
                    setDesactivarBtnAplicar(false)
                    return;
                }
            })

            if(!sobrepasanLosPagosRestantes) {

                await axios.post('/aplicar-pagos', {
                    pagos : pagosAplicar,
                    clientes : clientesSeleccionados
                })
                .then(res => {
                    let auxOnReload = !onReload
                    setOnReload(auxOnReload)

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Pagos registrados exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(err => {
                    console.log(err.response)
                })
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Los pagos a aplicar sobrepasan los pagos que restan',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Falta seleccionar clientes o pagos a aplicar',
                showConfirmButton: false,
                timer: 1500
            })
        }

        setDesactivarBtnAplicar(false)

    }

    const handleChangePagoAplicar = (e) => {
        setPagosAplicar(e.target.value)
    }

    const handleCheckedData = (e) => {
        setClientesSeleccionados(e);
    }

    const handleFormIsOpen = (e) => {
        setFormIsOpen(e)
        setPagosAplicar(1)
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Aplicaci??n de pagos</h2>}
        >
            <Head title="Aplicacion de pagos"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6  pt-1 text-gray-900">
                            
                            <div>
                            <div className='mt-10 grid lg:grid-cols-2 sm:grid-cols-1 gap-4'>
                                
                                {
                                    !formIsOpen 
                                    ?
                                    <div>
                                        <h1 className='pt-2 text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>
                                            Pagos a aplicar
                                        </h1>
                                        <div className='flex flex-grap mt-4'>
                                            <div>
                                                <TextField label="Pagos" name='pagos' className="outline-0 focus:border-0" min={0} value={pagosAplicar}  onChange={handleChangePagoAplicar}></TextField>
                                            </div>
                                            <div className='ml-5 mt-2' >
                                                <Button disabled={desactivarBtnAplicar} variant="outlined" onClick={handleAplicarPagos}>Aplicar</Button>
                                            </div>
                                        </div>
                                    </div> 
                                    : null 
                                }
                            </div>

                            <div>
                                <ListClientesCreditos 
                                    getCheckedData={handleCheckedData} 
                                    onReload={onReload} 
                                    formIsOpen={handleFormIsOpen}
                                    mostrarFinalizados={false}
                                />
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default AplicacionPago
