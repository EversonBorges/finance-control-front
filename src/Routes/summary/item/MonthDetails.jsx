import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiFetch from '../../../axios/config';
import CardBudgeted from './CardBudgeted';
import Card from './Card';
import {SummaryContext} from '../../../contexts/SummaryContext'
import UtilServices from '../../../utils/UtilServices';

function MonthDetails() {
    const { month, year } = useParams();
    const { selectedYear, setSelectedYear } = useContext(SummaryContext)
    const [arrayRevenues, setArrayRevenues] = useState({})
    const [arrayEssential, setArrayEssential] = useState({})
    const [arrayNoEssential, setArrayNoEssential] = useState({})
    const [arrayInvestments, setArrayInvestments] = useState({})
    const [arrayCreditCard, setArrayCreditCard] = useState({})
    const [monthDescription, setMonthDescription] = useState("")

    const getMonthDetails = async () => {
        try {
            const response = await apiFetch.get(`expense/summary-month/${selectedYear}/${month}`);
            const content = response.data;

            if(content && content.revenuesSummaryDTOS){
                setArrayRevenues(content.revenuesSummaryDTOS)
            }

            if(content && content.creditCardSummaryDTOS){
                setArrayCreditCard(content.creditCardSummaryDTOS)
            }

            if(content && content.investmentsSummaryDTOS){
                setArrayInvestments(content.investmentsSummaryDTOS)
            }

            if(content && content.expenseSummaryDTOS){

                content.expenseSummaryDTOS.forEach(element => {
                    setArrayEssential(element.essentialSum)
                    setArrayNoEssential(element.nonEssentialSum)
                })
                
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getMonthDetails();
        getMonthDescription(month)
    }, [selectedYear, month])

    function getMonthDescription(code) {
        var months = UtilServices.getListMonths()
        for (let i = 0; i < months.length; i++) {
            if (months[i].cod == code) {
                setMonthDescription(months[i].description)
            }
        }
        return null; // Retorna null se não encontrar o código correspondente
    }

    return (
        <div className='flex flex-row gap-3 pt-12 border border-gray-300 bg-gray-300 dark:bg-dark-200 h-screen'>
            <div id='div1' className='w-2/3 p-2 flex flex-col items-center bg-white dark:bg-gray-200 rounded-lg'>
            <span className='font-bold text-xl text-black'>Referencia: {monthDescription} - {selectedYear}</span>
                    <div id='pai' className='h-full flex flex-col gap-1'>
                        <div id='filho 1' className='flex-grow-[0.8] flex flex-row gap-1 items-center'>
                            <Card header={'Receitas'} obj={arrayRevenues} bgColor={'bg-emerald-200'}/>
                            <CardBudgeted header={'Investimentos'} obj={arrayInvestments} bgColor={'bg-blue-400'}/>
                            <Card header={'Cartões'} obj={arrayCreditCard} bgColor={'bg-gray-400 '}/>
                        </div>
                        <div id='filho 2' className='flex-grow-[0.2]'>
                            <div id='neto 4' className='p-2 flex flex-col items-center pb-1 bg-gray-400 font-semibold text-xs dark:text-gray-200 rounded-lg h-full'>
                                <span className='text-black'>Detalhamento</span>
                                <div className='overflow-y-auto'>
                                    <span className='text-black'>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <div id='div2' className='flex flex-col items-center  w-1/2 p-2 bg-white dark:bg-gray-200 rounded-lg'>
                <span className='font-bold text-xl text-black'>Despesas</span>
                <div className='flex gap-3 pb-1 font-semibold text-xs dark:text-gray-200 flex-grow-[1]'>
                    {
                        <>
                            <CardBudgeted header={'Essencial'} obj={arrayEssential} bgColor={'bg-red-400'}/>
                            <CardBudgeted header={'Não Essencial'} obj={arrayNoEssential} bgColor={'bg-red-400'}/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default MonthDetails;
