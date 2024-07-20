import React, { useEffect, useContext } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend } from 'chart.js';
import apiFetch from '../axios/config';
import GraphicsUtils from './GraphicsServices';
import GraphYear from './GraphTransactionsForYear';
import GraphMonth from './GraphTransactionsMonths';
import GraphBudgetedYear from './GraphTransactionsBudgetedAcommplishedByYear';
import GraphBudgetedMonth from './GraphTransactionsBudgetedAcommplished';
import GraphExpensesMonth from './GraphTransactionsEssentialWithNoEssential';
import { SummaryContext } from '../contexts/SummaryContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

const MyChart = () => {
  const { chartData, setChartData,
    isDataFetched, setIsDataFetched,
    years, setYears,
    year, setYear,
    reference, setReference 
  } = useContext(SummaryContext);

  const handleChange = (event) => {
    let year = event.target.value;
    fetchDataMonth(year);
    fetchDataReferenceYear(year);
    fetchDataBudgetedAccomplishedByYear(year);
    setYear(year);
  };

  useEffect(() => {
    if (!isDataFetched) {
      let year = new Date().getFullYear();
      fetchDataMonth(year);
      fetchDataReferenceYear(year);
      fetchDataBudgetedAccomplishedByYear(year);
      setYear(year);
      fetchDataYear();
      fetchDataBudgetedAccomplished();
      setIsDataFetched(true);
    }
  }, [isDataFetched]);

  function buildReferenceYear(obj) {
    let msg = '';

    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      msg += element;
      if ((i + 1) !== obj.length) {
        msg += '-';
      }
    }
    return msg;
  }

  const fetchDataBudgetedAccomplished = async () => {
    try {
      let url = `commons/summary-month`;
      const response = await apiFetch.get(url);
      const data = response.data;
      const processedData = GraphBudgetedMonth.transactionBudgetedAcommplished(data);
      setChartData(prevData => ({
        ...prevData,
        barData_3: processedData,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchDataBudgetedAccomplishedByYear = async (year) => {
    try {
      let url = `commons/summary-month-year/${year}`;
      const response = await apiFetch.get(url);
      const data = response.data;
      const processedData = GraphBudgetedYear.transactionBudgetedAcommplishedByYear(data);
      setChartData(prevData => ({
        ...prevData,
        lineData_2: processedData,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchDataReferenceYear = async (year) => {
    try {
      let url = `expense/reference-year-month/${year}`;
      const response = await apiFetch.get(url);
      const data = response.data;
      const processedData = GraphExpensesMonth.transactionEssentialWithNoEssential(data);
      setChartData(prevData => ({
        ...prevData,
        barData_2: processedData,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchDataMonth = async (year) => {
    try {
      let url = `commons/summary-month/${year}`;
      const response = await apiFetch.get(url);
      const data = response.data;
      const lineData = GraphMonth.transactionMonths(data);
      setChartData(prevData => ({
        ...prevData,
        lineData: lineData,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const fetchDataYear = async () => {
    try {
      let url = `expense/financial-summary`;
      const response = await apiFetch.get(url);
      const data = response.data;
      const barData = GraphYear.transactionForYear(data);
      setYears(barData.labels);
      setReference(buildReferenceYear(barData.labels));
      setChartData(prevData => ({
        ...prevData,
        barData: barData,
      }));
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  return (
    <div className='pt-12'>
      <div className='flex items-center gap-2 justify-center font-semibold mb-2'>
        <select
          name="year"
          value={year}
          onChange={handleChange}
          className="border border-gray-100 p-1 rounded-md"
        >
          <option value="">Selecione um ano</option>
          {years.map((opt, index) => (
            <option key={index} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-12 gap-2 px-2'>
        <div className="col-span-4 w-full h-[250px] border-2 border-gray-400 bg-white rounded-md">
          <Bar data={chartData.barData} options={GraphicsUtils.getOptions('Transações - Anos')} />
        </div>
        <div className="col-span-8 border-2 w-full h-[250px] border-gray-400 bg-white rounded-md">
          <Line data={chartData.lineData} options={GraphicsUtils.getOptions(`Resultado geral por mês - Ano ${year}`)} />
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 pt-2 px-2'>
        <div className="w-full h-[250px] border-2 border-gray-400 bg-white rounded-md">
          <Bar data={chartData.barData_3} options={GraphicsUtils.getOptions(`Orçado X Realizado - Anos (${reference})`)} />
        </div>
        <div className="w-full h-[250px] border-2 border-gray-400 bg-white rounded-md">
          <Bar data={chartData.barData_2} options={GraphicsUtils.getOptions(`Despesas Essencias X Não Essenciais por mês - Ano ${year}`)} />
        </div>
        <div className="w-full h-[250px] border-2 border-gray-400 bg-white rounded-md">
          <Line data={chartData.lineData_2} options={GraphicsUtils.getOptions(`Orçado X Realizado por mês - Ano ${year}`)} />
        </div>
      </div>
    </div>
  );
};

export default MyChart;
