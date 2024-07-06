import React, { useState, useEffect, useContext } from 'react';
import SummaryYear from './summaryYear/SummaryYear';
import apiFetch from '../../axios/config';
import 'react-toastify/dist/ReactToastify.css';
import SummaryMonth from '../summary/summaryMonth/SummaryMonth';
import { SummaryContext } from '../../contexts/SummaryContext';
import SummaryYearSkeleton from '../summary/summaryYear/SummaryYearSkeleton';

function Summary() {
  const { selectedYear, setSelectedYear, summaryYear, setSummaryYear, summaryMonth, setSummaryMonth } = useContext(SummaryContext);
  const [isLoading, setIsLoading] = useState(summaryYear.length === 0);

  const getSummaryYear = async () => {
    try {
      const response = await apiFetch.get("expense/financial-summary");
      const content = response.data;
      setSummaryYear(content);
      setIsLoading(false);
      if (!selectedYear) {
        getSummaryMonth(content[0].year);
      } else {
        getSummaryMonth(selectedYear);
      }
    } catch (error) {
      console.log(error.config);
    }
  };

  const getSummaryMonth = async (year) => {
    setSelectedYear(year);
    try {
      const response = await apiFetch.get(`expense/summary-month/${year}`);
      const content = response.data;
      setSummaryMonth(content);
      console.log(content);
    } catch (error) {
      console.log(error.config);
    }
  };

  useEffect(() => {
    if (summaryYear.length === 0) {
      getSummaryYear();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className='flex flex-col gap-5 pt-12 border border-gray-300 bg-gray-300 dark:bg-dark-200 h-screen cursor-pointer'>
      <div id='div1' className='min-h-[18%] p-2 bg-white dark:bg-gray-600 rounded-lg'>
        <div className="grid gap-2 sm:mt-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <SummaryYearSkeleton key={index} />
            ))
          ) : (
            summaryYear.map((summary) => (
              <SummaryYear summary={summary} key={summary.id} onYearClick={getSummaryMonth} />
            ))
          )}
        </div>
      </div>
      <div id='div2' className='min-h-[74%] p-2 bg-white dark:bg-gray-600 rounded-lg'>
        <>
          <p className='text-center font-bold text-xl uppercase text-black dark:text-white font-extrabold'>{selectedYear}</p>
          <SummaryMonth summaryMonth={summaryMonth} year={selectedYear} />
        </>
      </div>
    </div>
  );
}

export default Summary;
