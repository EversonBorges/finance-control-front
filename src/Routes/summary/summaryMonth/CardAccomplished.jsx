import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import UtilServices from '../../../utils/UtilServices';
import { SummaryContext } from '../../../contexts/SummaryContext'

function CardAccomplished({ header, obj, bgColor, url}) {

    const [localObj, setLocalObj] = useState([])
    const [totalAmount, setTotalAmount] = useState("")
    const { totalRevenues, setTotalRevenues } = useContext(SummaryContext)

    useEffect(() => {
        if (Array.isArray(obj)) {
            setLocalObj(obj);
            getTotalAmount(obj)
        } else {
            setLocalObj([]);
        }

    }, [obj]);

   function getTotalAmount(obj) {
    if(obj){
        var total = "R$ 0,00"
        obj.forEach(element => {
            total = UtilServices.operationsCurrencies(total, element.sum, 'sum')
        });
        setTotalAmount(total)
        if(header === 'Receitas'){
            setTotalRevenues(total);
        }
    }
   }

    return (
        <div id='neto 2' className={`pt-2 flex flex-col items-center  ${bgColor} font-semibold text-xs dark:text-gray-200 rounded-lg equal-height fixed-height`}>
            <span className='text-black'>{header}</span>
            <table class="w-full border-collapse">
                <thead>
                    <tr>
                        <th class="text-black text-left p-1 w-40">Descrição</th>
                        <th class="text-black text-left p-1">Realizado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                          localObj && localObj.map((element, index) => (
                                    <tr key={index}>
                                        <td class="text-black px-1 w-40">{element.description}</td>
                                        <td class="text-black px-1 text-right">{element.sum}</td>
                                    </tr>
                            ))
                    }
                    <td class="text-black pt-2 px-1 font-bold">Total:</td>
                    <td class="text-black pt-2 px-1 text-right font-bold w-40">{totalAmount}</td>
                </tbody>
            </table>
            <Link to={url} className="text-black mt-auto mb-1 sm:hover:scale-125 button-link">Detalhar</Link>
        </div>
    )
}

export default CardAccomplished