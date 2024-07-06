import React from 'react'
import { FunnelIcon, XCircleIcon } from '@heroicons/react/24/solid'

function SubHeaderTable(props) {
    return (
        <div className='flex flex-col lg:flex-row lg:gap-2 xl:gap-7 2xl:gap-24'>
            <div className='flex gap-1  text-gray-900 dark:text-gray-200'>
                <FunnelIcon className='h-5' />
                <input value={props.filterText} onChange={props.onFilter} placeholder='Filtrar' className='rounded-md pl-2 text-black'></input> 
                <XCircleIcon className='cursor-pointer h-6' onClick={props.onClear}/>
            </div>
        </div>
    )
}

export default SubHeaderTable

