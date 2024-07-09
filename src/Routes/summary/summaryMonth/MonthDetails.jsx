import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import apiFetch from '../../../axios/config';
import CardBudgetedAccomplished from './CardBudgetedAccomplished';
import CardAccomplished from './CardAccomplished';
import { SummaryContext } from '../../../contexts/SummaryContext'
import UtilServices from '../../../utils/UtilServices';
import TrTablePercent from './TrTablePercent';

function MonthDetails() {
    const { month, year } = useParams();
    const { selectedYear, setSelectedYear } = useContext(SummaryContext)
    const { totalRevenues, setTotalRevenues } = useContext(SummaryContext)
    const [arrayRevenues, setArrayRevenues] = useState({})
    const [arrayEssential, setArrayEssential] = useState({})
    const [arrayNoEssential, setArrayNoEssential] = useState({})
    const [arrayInvestments, setArrayInvestments] = useState({})
    const [arrayCreditCard, setArrayCreditCard] = useState({})
    const [monthDescription, setMonthDescription] = useState("")
    const [totalExpenses, setTotalExpenses] = useState("R$ 0,00")
    const [valuePercentsInvestiments, setValuePercentsInvestiments] = useState({})
    const [valuePercentsEssentials, setValuePercentsEssentials] = useState({})
    const [valuePercentsNonEssentials, setValuePercentsNonEssentials] = useState({})

    const getMonthDetails = async () => {
        try {
            const response = await apiFetch.get(`expense/summary-month/${selectedYear}/${month}`);
            const content = response.data;

            if (content && content.revenuesSummaryDTOS) {
                setArrayRevenues(content.revenuesSummaryDTOS)
            }

            if (content && content.creditCardSummaryDTOS) {
                setArrayCreditCard(content.creditCardSummaryDTOS)
            }

            if (content && content.investmentsSummaryDTOS && content.budgetedSummaryDTOS) {
                var investmentsSummaryList = buildBudgetedXAccomplished(
                    content.budgetedSummaryDTOS[0].withoutClassification,
                    content.investmentsSummaryDTOS)
                setArrayInvestments(investmentsSummaryList)
                setValuePercentsInvestiments(buildValuesPercent(
                    investmentsSummaryList.totalBudgeted,
                    investmentsSummaryList.totalAccomplished
                ))
            }


            if (content && content.expenseSummaryDTOS && content.budgetedSummaryDTOS) {
                content.expenseSummaryDTOS.forEach(element => {
                    var essentialSumSummaryList = buildBudgetedXAccomplished(
                        content.budgetedSummaryDTOS[0].essentialSum,
                        element.essentialSum)
                    setArrayEssential(essentialSumSummaryList)
                    setValuePercentsEssentials(buildValuesPercent(
                        essentialSumSummaryList.totalBudgeted,
                        essentialSumSummaryList.totalAccomplished
                    ))

                    var nonEssentialSumSumSummaryList = buildBudgetedXAccomplished(
                        content.budgetedSummaryDTOS[0].nonEssentialSum,
                        element.nonEssentialSum)
                    setArrayNoEssential(nonEssentialSumSumSummaryList)
                    setValuePercentsNonEssentials(buildValuesPercent(
                        nonEssentialSumSumSummaryList.totalBudgeted,
                        nonEssentialSumSumSummaryList.totalAccomplished
                    ))
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

    function buildBudgetedXAccomplished(budgetedList, objList) {
        var resultArray = []

        var totalBudgeted = "R$ 0,00"
        var totalAccomplished = "R$ 0,00"

        objList.forEach(item => {

            var obj = {
                description: item.description,
                budgeted: null,
                accomplished: item.sum
            }
            resultArray.push(obj)
            totalAccomplished = UtilServices.operationsCurrencies(totalAccomplished, item.sum, 'sum')
        })

        budgetedList.forEach(element => {
            var hasItem = resultArray.some(ite => ite.description === element.description)

            if (hasItem) {
                let item = resultArray.find(result => result.description === element.description);
                item.budgeted = element.sum
            } else {
                var obj = {
                    description: element.description,
                    budgeted: element.sum,
                    accomplished: null
                }
                resultArray.push(obj)
            }
            totalBudgeted = UtilServices.operationsCurrencies(totalBudgeted, element.sum, 'sum')
        });

        setTotalExpenses(UtilServices.operationsCurrencies(totalBudgeted, totalAccomplished, 'sum'))

        var total = {
            totalBudgeted: totalBudgeted,
            totalAccomplished: totalAccomplished,
            array: resultArray
        }
        return total
    }

    function buildValuesPercent(totalBudgeted,totalAccomplished) {
        
        var perBudgeted =UtilServices.calculatePercentage(totalBudgeted,totalRevenues)
        var perAccomplished = UtilServices.calculatePercentage(totalAccomplished,totalRevenues)
      var balance = (perBudgeted - perAccomplished).toFixed(2)
        perBudgeted = perBudgeted.toFixed(2)
        perAccomplished = perAccomplished.toFixed(2)
        return {
            budgeted:perBudgeted,
            accomplished:perAccomplished,
            balance:balance
        }
    }

    return (
        <div className='flex flex-row gap-1 pt-12 border border-gray-300 bg-gray-300 dark:bg-dark-200 h-screen'>
            <div id='div1' className='w-2/3 p-1 flex flex-col items-center bg-white dark:bg-gray-200 rounded-lg'>
                <span className='font-bold text-xl text-black'>Referencia: {monthDescription} - {selectedYear}</span>
                <div id='pai' className='h-full flex flex-col gap-1'>
                    <div id='filho 1' className='flex-grow-[3] flex flex-row gap-1 items-center'>
                        <CardAccomplished header={'Receitas'} obj={arrayRevenues} bgColor={'bg-emerald-200'} url={`/month-details/revenues/${selectedYear}/${month}`}/>
                        <CardBudgetedAccomplished header={'Investimentos'} obj={arrayInvestments} bgColor={'bg-blue-400'} />
                        <CardAccomplished header={'Cartões'} obj={arrayCreditCard} bgColor={'bg-gray-400 '} />
                    </div>
                    <div id='filho 2' className='p-1 flex  items-center flex-col pb-1 bg-gray-400 font-semibold text-xs dark:text-gray-200 rounded-lg '>
                    <span className=' text-sm text-black'>Resultados</span>
                        <div className='flex flex-row gap-5'>
                            <div className='font-bold text-sm text-black'>
                                <table class="w-full border-collapse">
                                    <tbody>
                                        <tr>
                                            <td class="text-black text-left p-1 w-40">Receitas:</td>
                                            <td class="text-black px-1 text-right">{totalRevenues}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-black text-left p-1 w-40">Despesas:</td>
                                            <td class="text-black px-1 text-right">{totalExpenses}</td>
                                        </tr>
                                        <tr>
                                            <td class="text-black text-left p-1 w-40">Saldo mês:</td>
                                            <td class="text-black px-1 text-right">
                                                {UtilServices.operationsCurrencies(totalRevenues, totalExpenses, 'sub')}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-center ">
                                <div className="border-l border-black" style={{ height: '70px', width: '2px' }}></div>
                            </div>
                            <div className='font-bold text-sm text-black'>
                                <table class="w-full border-collapse ">
                                    <thead>
                                        <tr>
                                            <th class="text-black text-left p-1 w-40">Descrição</th>
                                            <th class="text-black text-left px-3">Orçado</th>
                                            <th class="text-black text-left px-3">Realizado</th>
                                            <th class="text-black text-left px-3">Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TrTablePercent header={'Investimentos'} budgeted={valuePercentsInvestiments.budgeted} 
                                            accomplished={valuePercentsInvestiments.accomplished} 
                                            balance={valuePercentsInvestiments.balance}/>
                                        <TrTablePercent header={'Essenciais'} budgeted={valuePercentsEssentials.budgeted} 
                                            accomplished={valuePercentsEssentials.accomplished} 
                                            balance={valuePercentsEssentials.balance}/>
                                        <TrTablePercent header={'Não Essenciais'} budgeted={valuePercentsNonEssentials.budgeted} 
                                            accomplished={valuePercentsNonEssentials.accomplished} 
                                            balance={valuePercentsNonEssentials.balance}/>
                                    </tbody>
                                </table>
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
                            <CardBudgetedAccomplished header={'Essencial'} obj={arrayEssential} bgColor={'bg-red-400'} 
                                    url={`/month-details/expenses/${selectedYear}/${month}/Essencial`}/>
                            <CardBudgetedAccomplished header={'Não Essencial'} obj={arrayNoEssential} bgColor={'bg-red-400'} 
                                    url={`/month-details/expenses/${selectedYear}/${month}/Não Essencial`}/>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default MonthDetails;
