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

            if(content && content.investmentsSummaryDTOS && content.budgetedSummaryDTOS){
                var investmentsSummaryList = buildBudgetedXAccomplished(
                    content.budgetedSummaryDTOS[0].withoutClassification, 
                    content.investmentsSummaryDTOS)
                setArrayInvestments(investmentsSummaryList)
            }

            
            if(content && content.expenseSummaryDTOS && content.budgetedSummaryDTOS){
                content.expenseSummaryDTOS.forEach(element => {
                    var essentialSumSummaryList = buildBudgetedXAccomplished(
                        content.budgetedSummaryDTOS[0].essentialSum, 
                        element.essentialSum)
                    setArrayEssential(essentialSumSummaryList)
                    
                    var nonEssentialSumSumSummaryList = buildBudgetedXAccomplished(
                        content.budgetedSummaryDTOS[0].nonEssentialSum, 
                        element.nonEssentialSum)
                    setArrayNoEssential(nonEssentialSumSumSummaryList)
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
        return null;
    }

    function buildBudgetedXAccomplished(budgetedList, objList){
        var resultArray = []

        var totalBudgeted = "R$ 0,00"
        var totalAccomplished =  "R$ 0,00"

        objList.forEach(item => {

            var obj = {
                description: item.description,
                budgeted: null,
                accomplished: item.sum
            }
            resultArray.push(obj)
            totalAccomplished = UtilServices.sumCurrencies(totalAccomplished, item.sum)
        })

        budgetedList.forEach(element => {
            var hasItem = resultArray.some( ite => ite.description === element.description )

            if (hasItem) {
                let item = resultArray.find(result => result.description === element.description);
                item.budgeted = element.sum
            }else{
                var obj = {
                    description: element.description,
                    budgeted: element.sum,
                    accomplished: null
                }
                resultArray.push(obj)
            }
            totalBudgeted = UtilServices.sumCurrencies(totalBudgeted, element.sum)
        });

        var total = {
            totalBudgeted : totalBudgeted,
            totalAccomplished : totalAccomplished,
            array : resultArray
        }
        return total
    }
    
    return (
        <div className='flex flex-row gap-1 pt-12 border border-gray-300 bg-gray-300 dark:bg-dark-200 h-screen'>
            <div id='div1' className='w-2/3 p-1 flex flex-col items-center bg-white dark:bg-gray-200 rounded-lg'>
                <span className='font-bold text-xl text-black'>Referencia: {monthDescription} - {selectedYear}</span>
                <div id='pai' className='h-full flex flex-col gap-1'>
                    <div id='filho 1' className='flex-grow-[0.8] flex flex-row gap-1 items-center'>
                        <Card header={'Receitas'} obj={arrayRevenues} bgColor={'bg-emerald-200'} />
                        <CardBudgeted header={'Investimentos'} obj={arrayInvestments} bgColor={'bg-blue-400'} />
                        <Card header={'Cartões'} obj={arrayCreditCard} bgColor={'bg-gray-400 '} />
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
            <div id='div2' className='flex flex-col items-center  w-1/2 p-1 bg-white dark:bg-gray-200 rounded-lg'>
                <span className='font-bold text-xl text-black'>Despesas</span>
                <div className='flex gap-1 pb-1 font-semibold text-xs dark:text-gray-200 flex-grow-[1]'>
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
