import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"

const UtilServices = {
    mascaraMoeda: mascaraMoeda,
    showToast: showToast,
    formatterDate: formatterDate,
    getListMonths: getListMonths,
    operationsCurrencies:operationsCurrencies,
    calculatePercentage:calculatePercentage,
    createPaymentMethodsEnum:createPaymentMethodsEnum,
    moveToMonthAndYear:moveToMonthAndYear,
    parseCurrencyForGraphics:parseCurrencyForGraphics,
    getMonthBasedNumber:getMonthBasedNumber,
    formatCurrency:formatCurrency
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

  function formatterDate(value){
    const date = parseISO(value);
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
 }

function getListMonths() {
  return [
    {description: 'Janeiro', cod: 1 }, {description: 'Fevereiro', cod: 2}, {description: 'Março', cod: 3 }, 
    {description: 'Abril', cod: 4 }, {description: 'Maio', cod: 5}, {description: 'Junho', cod: 6}, 
    {description: 'Julho', cod: 7}, {description: 'Agosto', cod: 8}, {description: 'Setembro', cod: 9}, 
    {description: 'Outubro', cod: 10}, {description: 'Novembro', cod: 11}, {description: 'Dezembro', cod: 12}
  ]
}

function parseCurrency(value) {
  if (typeof value !== 'string') {
    console.error("Expected a string for parseCurrency, but got:", value);
    return "R$ 0,00"; // Retorno padrão caso o valor não seja uma string
}
  value = value.replace("R$", "").trim();
  return parseFloat(value.replace(/\./g, '').replace(',', '.'));
}

function formatCurrency(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


function parseCurrencyForGraphics(value){
  return parseFloat(value.replace(/[^\d,-]/g, '').replace(',', '.'));
};

function operationsCurrencies(currency1, currency2, operator) {
  const num1 = parseCurrency(currency1);
  const num2 = parseCurrency(currency2);
  let sum = 0;
  
  if(operator === 'sub'){
    return formatCurrency(num1 - num2);
  }

  if(operator === 'sum'){
    return formatCurrency(num1 + num2);
  }

}

function calculatePercentage(currency1, currency2) {
  const num1 = parseCurrency(currency1);
  const num2 = parseCurrency(currency2);

  if (num2 === 0) {
    return "0%";
  }
  const porcentagem = (num1 / num2) * 100;
  return porcentagem;
}

function createPaymentMethodsEnum() {
  return {
    CREDIT_CARD: { id: "CRT", description: "Cartão de crédito" },
    DEBIT_CARD: { id: "DBT", description: "Cartão de débito" },
    PIX: { id: "PIX", description: "Pix" },
    FEED_CARD: { id: "ALM", description: "Alimentação" },
    ACCOUNT_DISCOUNT: { id: "DSC", description: "Desconto em conta" },

    getByKey: function (key) {
      if (this[key]) {
        return this[key];
      }
      return null;
    },

    getKeyByDescription: function (description) {
      for (let key in this) {
        if (this[key].description === description) {
          return this[key].id;
        }
      }
      return null;
    },

    getAllMethods: function () {
      const methods = [];
      for (let key in this) {
        if (typeof this[key] === 'object' && this[key].id && this[key].description) {
          methods.push(this[key]);
        }
      }
      return methods;
    }
  };
}

function  moveToMonthAndYear(increment,expenseMonth, expenseYear){
  let newMonth = parseInt(expenseMonth) + increment
  let newYear = expenseYear
  if (newMonth > 12) {
    newMonth = 1
    newYear = parseInt(expenseYear) + 1
  } else if (newMonth < 1) {
    newMonth = 12
    newYear = parseInt(expenseYear) - 1
  }
 
  return {
    newMonth: newMonth,
    newYear: newYear
  }

}

function getMonthBasedNumber(number) {
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  return months[number - 1];
}