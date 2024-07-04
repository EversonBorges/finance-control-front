const UtilServices = {
    mascaraMoeda: mascaraMoeda,
    showToast: showToast,
    formatterDate: formatterDate,
    getListMonths: getListMonths
}

export default UtilServices

function mascaraMoeda(event) {
    const onlyDigits = event?.target?.value
        .split("")
        .filter(s => /\d/.test(s))
        .join("")
        .padStart(3, "0")
    const digitsFloat = onlyDigits.slice(0, -2) + "." + onlyDigits.slice(-2)
    event.target.value = maskCurrency(digitsFloat)
}

function maskCurrency(valor, locale = 'pt-BR', currency = 'BRL') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency
    }).format(valor)
}

function showToast(params, type) {
    switch (type) {
      case "success":
        toast.success(params)
        break;
      case "warn":
        toast.warn(params)
        break;
    }
  }

  function formatterDate(dt){
    return `${dt.substring(8,10)}/${dt.substring(5,7)}`
 }

function getListMonths() {
  return [
    {description: 'Janeiro', cod: 1 }, {description: 'Fevereiro', cod: 2}, {description: 'Março', cod: 3 }, 
    {description: 'Abril', cod: 4 }, {description: 'Maio', cod: 5}, {description: 'Junho', cod: 6}, 
    {description: 'Julho', cod: 7}, {description: 'Agosto', cod: 8}, {description: 'Setembro', cod: 9}, 
    {description: 'Outubro', cod: 10}, {description: 'Novembro', cod: 11}, {description: 'Dezembro', cod: 12}
  ]
}

 //toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })