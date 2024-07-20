import React from 'react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/solid'

function SubHeaderTable(props) {
    return (
        <div className='flex flex-col lg:flex-row lg:gap-2 xl:gap-7 2xl:gap-24'>
            <div className='flex flex-col'>
                <div className='flex gap-1 items-center text-gray-900 dark:text-gray-200'>
                    <div className="relative">
                        <input
                            value={props.filterText}
                            onChange={props.onFilter}
                            placeholder='Filtrar'
                            className="rounded-md pl-10 pr-1 py-1 text-black w-full"
                        />
                        <MagnifyingGlassIcon className="h-5 absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <XMarkIcon className='h-5 absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer' onClick={props.onClear} />
                    </div>
                </div>
                {props.show && <span className='text-white flex justify-center'>E-Despesas I-Investimentos R-Receitas</span>}
            </div>
        </div>
    )
}

export default SubHeaderTable

