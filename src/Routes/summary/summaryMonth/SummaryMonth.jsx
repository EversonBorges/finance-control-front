import React, { useEffect, useState } from 'react'
import Month from './Month'
import UtilServices from '../../../utils/UtilServices'
import SummaryMonthSkeleton from '../../summary/summaryMonth/SummaryMonthSkeleton'

function SummaryMonth(props) {

  var summaryMonth = props.summaryMonth
  const [monthOfYear, setMonthOfYear] = useState([])

  useEffect(() => {
    buildSummaryMonth()
  }, [summaryMonth])

  const monthNames = UtilServices.getListMonths()

  function buildSummaryMonth() {
    const monthOfYear = Array.from({ length: 12 }, (_, index) => ({
      mes: monthNames[index],
      dados: {}
    }));

    const summaries = [
      { array: summaryMonth.expenseSummaryDTOS, name: 'expenseSummary' },
      { array: summaryMonth.investmentsSummaryDTOS, name: 'investmentsSummary' },
      { array: summaryMonth.resultsMonthSummaryDTOS, name: 'resultsSummary' },
      { array: summaryMonth.revenuesSummaryDTOS, name: 'revenuesSummary' }
    ];

    summaries.forEach(summary => {
      buildElement(summary.array, monthOfYear, summary.name);
    });

    setMonthOfYear(monthOfYear)
  }

  function buildElement(elements, monthOfYear, name) {
    if(summaryMonth && summaryMonth.length != 0){
      elements.forEach(item => {
        const index = item.referenceMonth - 1;
  
        if (index >= 0 && index < 12) {
          if (!monthOfYear[index].dados[name]) {
            monthOfYear[index].dados[name] = [];
          }
          monthOfYear[index].dados[name].push(item);
        }
      });
    }
  }

  return (
    <div className="grid gap-1 sm:mt-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4">
      {summaryMonth.length === 0 ? (
        Array.from({ length: 12 }).map((_, index) => (
          <SummaryMonthSkeleton key={index} />
        ))
      ) : (
        monthOfYear.map((month) => (
          <Month month={month} key={month.id} year={props.year} />
        ))
      )}
    </div>
  )
}

export default SummaryMonth