import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { FormClientes } from '@/Components/Clientes/FormClientes';
import { ListClientes } from '@/Components/Clientes/ListClientes';
import { EditFormClient } from '@/Components/Clientes/EditFormClient';

const Clientes = (props) => {
    const { cliente } = usePage().props
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Clientes</h2>}
        >
            <Head title="Clientes"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <EditFormClient/>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Clientes