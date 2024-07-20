import UtilServices from '../utils/UtilServices';

const Graph = {
  transactionBudgetedAcommplished: transactionBudgetedAcommplished,
}

function transactionBudgetedAcommplished(transactions) {

  const aggregatedBudgeted = aggregateDataByClassification(transactions.budgeted);
  const aggregatedExpenses = aggregateDataByClassification(transactions.expenses);
  const aggregatedInvestments = aggregateDataByClassification(transactions.investments);

  function aggregateDataByClassification(data) {
    return data.reduce((acc, item) => {
      const classification = item.classification || 'Investimentos';
      const sum = UtilServices.parseCurrencyForGraphics(item.sum);
      acc[classification] = (acc[classification] || 0) + sum;
      return acc;
    }, {});
  };

  const labels = Array.from(new Set([
    ...Object.keys(aggregatedBudgeted),
    ...Object.keys(aggregatedExpenses),
    ...Object.keys(aggregatedInvestments)
  ]));

  const budgetedData = labels.map(label => aggregatedBudgeted[label] || 0);
  const expensesData = labels.map(label => aggregatedExpenses[label] || 0);
  const investmentsData = labels.map(label => aggregatedInvestments[label] || 0);


  return {
    labels,
    datasets: [
      {
        label: 'Orçado',
        data: budgetedData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'Despesas realizadas',
        data: expensesData,
        backgroundColor: 'rgba(54, 162, 235, 0.5)'
      },
      {
        label: 'Investimentos realizados',
        data: investmentsData,
        backgroundColor: 'rgba(255, 206, 86, 0.5)'
      }
    ]
  };
}

export default Graph