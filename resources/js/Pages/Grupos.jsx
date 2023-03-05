import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, usePage } from '@inertiajs/react'
import { ListGrupos } from '@/Components/Grupos/ListGrupos'

const Grupos = (props) => {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Grupos</h2>}
        >
            <Head title="Grupos"></Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <ListGrupos />
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default Grupos
