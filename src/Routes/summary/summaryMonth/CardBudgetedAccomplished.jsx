import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { SummaryContext } from '../../../contexts/SummaryContext';

function CardBudgetedAccomplished({ header, obj, bgColor, url}) {
  
    const [totalBudgeted, setTotalBudgeted] = useState("")
    const [totalAccomplished, setTotalAccomplished] = useState("")
    const [localObj, setLocalObj] = useState([])
    const { setBalanceExpensesEssential,
        setBalanceInvestments,
        setBalanceExpensesNoEssential
    } = useContext(SummaryContext)

    

    useEffect(() => {
        if (Array.isArray(obj.array)) {
            setLocalObj(obj.array);
        } else {
            setLocalObj([]);
        }

        setTotalAccomplished(obj.totalAccomplished)
        setTotalBudgeted(obj.totalBudgeted)
        
        if(header === 'Investimentos'){
            setBalanceInvestments(obj.totalAccomplished)
        }

        if(header === 'Essencial'){
            setBalanceExpensesEssential(obj.totalAccomplished)
        }

        if(header === 'Não Essencial'){
            setBalanceExpensesNoEssential(obj.totalAccomplished)
        }

    }, [obj]);

    return (
        <div id='neto 2' className={`pt-2 flex flex-col items-center  ${bgColor} font-semibold text-xs dark:text-gray-200 rounded-lg equal-height fixed-height`}>
            <span className='text-black'>{header}</span>
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="text-black text-left p-1 w-40">Descrição</th>
                        <th className="text-black text-left p-1">Realizado</th>
                        <th className="text-black text-left p-1">Orçado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                          localObj && localObj.map((element, index) => (
                                    <tr key={index}>
                                        <td className="text-black px-1 w-40">{element.description}</td>
                                        <td className="text-black px-1 text-right">{element.accomplished}</td>
                                        <td className="text-black px-1 text-right">{element.budgeted}</td>
                                    </tr>
                            ))
                    }
                     <td className="text-black pt-2 px-1 font-bold text-sm">Total:</td>
                     <td className="text-black pt-2 px-1 text-right w-40 font-bold ">{totalAccomplished}</td>
                     <td className="text-black pt-2 px-1 text-right w-40 font-bold ">{totalBudgeted}</td>
                </tbody>
            </table>
                <Link to={url} className="text-black mt-auto mb-1 sm:hover:scale-125 button-link">Detalhar</Link>
        </div>
    )
}

export default CardBudgetedAccomplished