import React from 'react'

function SummaryYear({ summary, onYearClick }) {

    return (
        <div onClick={() => onYearClick(summary.year)}
        className=' rounded-lg bg-gray-300 dark:bg-dark-200 shadow-gray-900 dark:shadow-gray-500 shadow-sm sm:hover:scale-110'>
                    <h6 className='text-center uppercase text-black dark:text-white font-extrabold '>{summary.year}</h6>
                    <div className='flex flex-col items-center pb-1 font-semibold text-sm dark:text-gray-200 text-xs'>
                        <span className='text-lime-700 dark:text-emerald-400'>Receitas: {summary.amountRevenuesYear}</span>
                        <span className='text-blue-900 dark:text-blue-400'>Investimentos:{summary.amountInvestmentsYear}</span>
                        <span className='text-red-900 dark:text-red-400'>Despesas: {summary.amountExpenseYear}</span>
                    </div>
        </div>
    )
}

export default SummaryYear