import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import UtilServices from '../../../utils/UtilServices';

function Card({ header, obj, bgColor}) {

    const [localObj, setLocalObj] = useState([])
    const [totalAmount, setTotalAmount] = useState("")

    useEffect(() => {
        if (Array.isArray(obj)) {
            setLocalObj(obj);
            getTotalAmount(localObj)
        } else {
            setLocalObj([]);
        }

    }, [obj]);

   function getTotalAmount(localObj) {
    if(localObj){
        var total = "R$ 0,00"
        localObj.forEach(element => {
            total = UtilServices.sumCurrencies(total, element.sum)
        });
        setTotalAmount(total)
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
            <Link to={"/"} className="text-black mt-auto mb-1 sm:hover:scale-125 button-link">Detalhar</Link>
        </div>
    )
}

export default Card