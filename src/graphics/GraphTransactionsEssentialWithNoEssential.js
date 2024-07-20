import UtilServices from '../utils/UtilServices';

const Graph = {
  transactionEssentialWithNoEssential: transactionEssentialWithNoEssential,
}

function transactionEssentialWithNoEssential(data) {
  const monthlyData = {};

  data.forEach(item => {
    const month = item.referenceMonth;
    const classification = item.category.classification;
    const value = UtilServices.parseCurrencyForGraphics(item.valuesInstallment);

    if (!monthlyData[month]) {
      monthlyData[month] = { essential: 0, nonEssential: 0 };
    }

    if (classification === "Essencial") {
      monthlyData[month].essential += value;
    } else {
      monthlyData[month].nonEssential += value;
    }
  });
  const labels = Object.keys(monthlyData);
  const essentialData = labels.map(month => monthlyData[month].essential);
  const nonEssentialData = labels.map(month => monthlyData[month].nonEssential);

  return {
    labels: labels.map(item => UtilServices.getMonthBasedNumber(item)),
    datasets: [
      {
        label: 'Essencial',
        data: essentialData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Não Essencial',
        data: nonEssentialData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };
};

export default Graph