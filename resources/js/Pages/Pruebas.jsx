import React, { useState } from 'react'
import AuthenticatedLayoutVue from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { FormEstima } from '@/Components/pruebas/FormEstima'

const Pruebas = (props) => {

    return (
        <AuthenticatedLayoutVue
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Estimacion</h2>}
        >
             <Head title="Estimacion"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
                        <div className='p-6 text-gray-900'>
                            <FormEstima />
                        </div>
                    </div>
                    
                </div>
            </div>
        </AuthenticatedLayoutVue>
    )
}

export default Pruebas
