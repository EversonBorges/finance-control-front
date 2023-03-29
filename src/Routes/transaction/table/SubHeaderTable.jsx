import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

function SubHeaderTable(props) {
    return (
        <div className='flex flex-col lg:flex-row lg:gap-7 xl:gap-12 2xl:gap-40 items-center'>
            <h1> Transações </h1>
            <h2 className='text-gray-900 dark:text-gray-200 font-bold text-lg'>
                Cartão: {props.nameCard}
            </h2>
            <h2 className='text-gray-900 dark:text-gray-200 font-bold text-lg'>
                Mês referencia: {props.referenceMonth}
            </h2>
            <h2 className='text-gray-900 dark:text-gray-200 font-bold text-lg'>
                Total de compras: {props.totalPurchases.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h2>
            <div className='flex gap-1 text-gray-200'>
                <MagnifyingGlassIcon className='h-6' /><input placeholder='Pesquisar' className='rounded-md pl-2'></input>
            </div>
        </div>
    )
}

export default SubHeaderTable

