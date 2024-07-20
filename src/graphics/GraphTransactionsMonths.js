import UtilServices from '../utils/UtilServices';

const Graph = {
  transactionMonths: transactionMonths,
}

function transactionMonths(data) {

  const labels = data.resultsMonthSummaryDTOS.map(item => UtilServices.getMonthBasedNumber(item.referenceMonth));
  const resultsSum = data.resultsMonthSummaryDTOS.map(item => UtilServices.parseCurrencyForGraphics(item.sum));
  const revenuesSum = data.revenuesSummaryDTOS.map(item => UtilServices.parseCurrencyForGraphics(item.sum));
  const investmentsSum = data.investmentsSummaryDTOS.map(item => UtilServices.parseCurrencyForGraphics(item.sum));
  const essentialExpenses = data.expenseSummaryDTOS.map(item => UtilServices.parseCurrencyForGraphics(item.essentialSum));
  const nonEssentialExpenses = data.expenseSummaryDTOS.map(item => UtilServices.parseCurrencyForGraphics(item.nonEssentialSum));
  return {
    labels: labels,
    datasets: [
      {
        label: 'Saldo',
        data: resultsSum,
        borderColor: 'rgba(255, 206, 86, 0.6)',
        fill: false,
      },
      {
        label: 'Receitas',
        data: revenuesSum,
        borderColor: 'rgba(49,141,118, 0.6)',
        fill: false,
      },
      {
        label: 'Investimentos',
        data: investmentsSum,
        borderColor: 'rgba(54, 162, 235, 0.6)',
        fill: false,
      },
      {
        label: 'Despesas essenciais',
        data: essentialExpenses,
        borderColor: 'rgba(255, 99, 132, 0.6)',
        fill: false,
      },
      {
        label: 'Despesas não essenciais',
        data: nonEssentialExpenses,
        borderColor: 'rgba(153, 102, 255, 0.6)',
        fill: false,
      },
    ],
  };
}

export default Graph