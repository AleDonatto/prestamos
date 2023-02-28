import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { FormMunicipios } from '@/Components/Municipios/FormMunicipios'

const Municipios = (props) => {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Municipios</h2>}
        >
            <Head title="Clientes"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    <FormMunicipios/>

                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Municipios
