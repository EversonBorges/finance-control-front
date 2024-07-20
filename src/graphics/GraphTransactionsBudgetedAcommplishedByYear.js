import UtilServices from '../utils/UtilServices';

const Graph = {
  transactionBudgetedAcommplishedByYear:transactionBudgetedAcommplishedByYear
}

function transactionBudgetedAcommplishedByYear(transactions) {

  function prepareData() {
    const budgetedGrouped = groupBy(transactions.budgeted, 'classification');
    const expensesGrouped = groupBy(transactions.expenses, 'classification');
    const investmentsGrouped = groupBy(transactions.investments, 'classification');

    const datasets = [];

    for (const [classification, items] of Object.entries(budgetedGrouped)) {
      datasets.push(createDataset(items, classification, 'orçado'));
    }

    for (const [classification, items] of Object.entries(expensesGrouped)) {
      datasets.push(createDataset(items,  classification, 'realizado'));
    }

    for (const [classification, items] of Object.entries(investmentsGrouped)) {
      datasets.push(createDataset(items, classification,'realizado'));
    }

    return datasets;
  };

  function groupBy(data, key) {
    return data.reduce((acc, item) => {
      const group = item[key] || 'Investimentos';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    }, {});
  };

  function createDataset(groupedData, classification, type) {
    const label = classification ? `${classification} ${type}` : `Investimentos ${type} `;
    const data = new Array(12).fill(0);
    groupedData.forEach(item => {
      data[item.referenceMonth - 1] = UtilServices.parseCurrencyForGraphics(item.sum);
    });
    return {
      label,
      data,
      borderColor: getColor(label),
      backgroundColor: getColor(label, 0.6),
      fill: false
    };
  };

  function getColor(label, opacity = 1) {
    const colors = {
      'Essencial orçado': `rgba(255, 206, 86, ${opacity})`,
      'Essencial realizado': `rgba(49,141,118, ${opacity})`,
      'Não Essencial orçado': `rgba(153, 102, 255, ${opacity})`,
      'Não Essencial realizado': `rgba(255, 99, 132, ${opacity})`,
      'Investimentos orçado': `rgba(51, 20, 50, ${opacity})`,
      'Investimentos realizado': `rgba(54, 162, 235, ${opacity})`,
    };
    return colors[label] || `rgba(0, 0, 0, ${opacity})`;
  };

  return {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: prepareData()
  };

}

export default Graph