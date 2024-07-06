import React from 'react'
import { Link } from 'react-router-dom'

function Month(props) {

    var month = props.month

    return (
        <div className=' rounded-lg bg-gray-300 dark:bg-dark-200 shadow-gray-900 dark:shadow-gray-500 shadow-sm sm:hover:scale-105'>
            <Link to={`/month-details/${month.mes.cod}/${props.year}`}>
                <>
                    <h5 className='text-center uppercase text-black dark:text-white font-extrabold'>{month.mes.description}</h5>
                    <div className='flex flex-col items-center pb-1 font-semibold text-xs dark:text-gray-200'>
                        <span className='text-lime-700 dark:text-emerald-400'>
                            Receitas: {month.dados.revenuesSummary != null ? month.dados.revenuesSummary[0].sum: 'R$ 0,00'}
                        </span>
                        <span className='text-blue-900 dark:text-blue-400'>
                            Investimentos: {month.dados.investmentsSummary != null ? month.dados.investmentsSummary[0].sum: 'R$ 0,00'}
                        </span>
                        <span className='text-yellow-500 dark:text-yellow-400'>
                            Resultado mês: {month.dados.resultsSummary != null ? month.dados.resultsSummary[0].sum: 'R$ 0,00'}
                        </span>
                        <tr className="border-t border-black dark:border-white  w-3/4 mx-auto" style={{ height: '2px' }} />
                        <span className='text-red-900 dark:text-red-400'>Despesas:</span>
                        <span className='text-red-900 dark:text-red-400'>
                            Essenciais: {month.dados.expenseSummary != null ? month.dados.expenseSummary[0].essentialSum: 'R$ 0,00'}
                        </span>
                        <span className='text-red-900 dark:text-red-400'>
                            Não Essenciais: {month.dados.expenseSummary != null ? month.dados.expenseSummary[0].nonEssentialSum: 'R$ 0,00'}
                        </span>
                    </div>
                </>
            </Link>
        </div>
    )
}

export default Month