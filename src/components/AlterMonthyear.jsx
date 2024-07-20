import React from 'react'
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/24/solid";

function AlterMonthYear({home, header, alterMonthAndYear, monthDescription, year:year, add}) {
    return (
        <div className='flex justify-between pb-2 px-3'>
            <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>{header}</h6>
            {home ? <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>{year}</h6> 
            : <div className='flex gap-3 items-center'>
                <button type="button" onClick={() => alterMonthAndYear(-1)}>
                    <ArrowLeftCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                </button>
                <h6 className='font-extrabold dark:text-gray-200 sm:text-lg'>{monthDescription} - {year}</h6>
                <button type="button" onClick={() => alterMonthAndYear(1)}>
                    <ArrowRightCircleIcon className='h-5 sm:h-8  text-gray-900 dark:text-gray-100 block cursor-pointer sm:hover:scale-110' />
                </button>
            </div>
            }
            <button onClick={() => add()} className='button-form'>Novo</button>
        </div>
    )
}

export default AlterMonthYear