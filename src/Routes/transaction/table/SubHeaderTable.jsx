import React from 'react'
import { FunnelIcon, XCircleIcon } from '@heroicons/react/24/solid'

function SubHeaderTable(props) {
    return (
        <div className='flex flex-col lg:flex-row lg:gap-2 xl:gap-7 2xl:gap-24 items-center'>
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
            <h2 className='text-gray-900 dark:text-gray-200 font-bold text-lg'>
                Total pagamento: {props.totalPay.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </h2>
            <div className='flex gap-1  text-gray-900 dark:text-gray-200'>
                <FunnelIcon className='h-6' />
                <input value={props.filterText} onChange={props.onFilter} placeholder='Filtrar por usuário' className='rounded-md pl-2 text-black'></input> 
                <XCircleIcon className='cursor-pointer h-6' onClick={props.onClear}/>
            </div>
        </div>
    )
}

export default SubHeaderTable

