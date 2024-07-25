import React, { createContext, useState } from 'react';

export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [summaryYear, setSummaryYear] = useState([]);
    const [summaryMonth, setSummaryMonth] = useState([]);
    const [totalRevenues, setTotalRevenues] = useState("");
    const [creditCards, setCreditCards] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showModalCreditCard, setShowModalCreditCard] = useState(false);
    const [showModalCategory, setShowModalCategory] = useState(false);
    const [theme, setTheme] = useState()
    const [chartData, setChartData] = useState({
        barData: { labels: [], datasets: [] },
        barData_2: { labels: [], datasets: [] },
        lineData: { labels: [], datasets: [] },
        lineData_2: { labels: [], datasets: [] },
        barData_3: { labels: [], datasets: [] },
    });
    const [years, setYears] = useState([]);
    const [year, setYear] = useState('');
    const [reference, setReference] = useState('');
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [balanceInvestments, setBalanceInvestments] = useState("R$ 0,00")
    const [balanceExpensesEssential, setBalanceExpensesEssential] = useState("R$ 0,00")
    const [balanceExpensesNoEssential, setBalanceExpensesNoEssential] = useState("R$ 0,00")

    return (
        <SummaryContext.Provider value={{
            selectedYear, setSelectedYear,
            summaryYear, setSummaryYear,
            summaryMonth, setSummaryMonth,
            totalRevenues, setTotalRevenues,
            creditCards, setCreditCards,
            showModalCreditCard, setShowModalCreditCard,
            categories, setCategories,
            showModalCategory, setShowModalCategory,
            theme, setTheme,
            chartData, setChartData,
            years, setYears,
            year, setYear,
            reference, setReference,
            isDataFetched, setIsDataFetched,
            balanceExpensesEssential, setBalanceExpensesEssential,
            balanceInvestments, setBalanceInvestments,
            balanceExpensesNoEssential, setBalanceExpensesNoEssential
        }}>
            {children}
        </SummaryContext.Provider>
    );
};
