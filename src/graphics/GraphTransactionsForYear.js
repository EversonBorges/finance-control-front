import UtilServices from '../utils/UtilServices';

const Graph = {
  transactionForYear: transactionForYear,
}

function transactionForYear(data) {
  if (Array.isArray(data)) {
    return {
      labels: data.map(item => item.year),
      datasets: [
        {
          label: 'Investimentos',
          data: data.map(item => UtilServices.parseCurrencyForGraphics(item.amountInvestmentsYear)),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
        {
          label: 'Receitas',
          data: data.map(item => UtilServices.parseCurrencyForGraphics(item.amountRevenuesYear)),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Despesas',
          data: data.map(item => UtilServices.parseCurrencyForGraphics(item.amountExpenseYear)),
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        }
      ],
    };
  } else {
    console.error("Erro: Os dados recebidos não são um array");
  }
}

export default Graph