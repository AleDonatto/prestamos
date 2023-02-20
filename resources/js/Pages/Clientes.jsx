import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Button from '@mui/material/Button';
import { FormClientes } from '@/Components/Clientes/FormClientes';
import { ListClientes } from '@/Components/Clientes/ListClientes';

const Clientes = (props) => {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
        >
            <Head title="Clientes"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>Agregar Clientes</h1>

                            <FormClientes />
                        </div>
                    </div>

                    <div className="mt-10 bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h1 className='text-base md:text-lg lg:text-xl font-weight-bold text-gray-600 font-bold'>Consulta Clientes</h1>

                            <ListClientes/>
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Clientes
