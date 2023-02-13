import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import Button from '@mui/material/Button';

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
                            <Button variant="contained">Hello World</Button>
                        </div>
                        
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    )
}

export default Clientes
