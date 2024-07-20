import React, { createContext, useState } from 'react';

export const MonthDetailsContext = createContext();

export const MonthDetailsProvider = ({ children }) => {
    const [arrayRevenues, setArrayRevenues] = useState({})
    const [arrayEssential, setArrayEssential] = useState({})
    const [arrayNoEssential, setArrayNoEssential] = useState({})
    const [arrayInvestments, setArrayInvestments] = useState({})
    const [arrayCreditCard, setArrayCreditCard] = useState({})
    const [monthDescription, setMonthDescription] = useState("")
    const [totalExpenses, setTotalExpenses] = useState("R$ 0,00")
    const [valuePercentsInvestiments, setValuePercentsInvestiments] = useState({})
    const [valuePercentsEssentials, setValuePercentsEssentials] = useState({})
    const [valuePercentsNonEssentials, setValuePercentsNonEssentials] = useState({})
    const [isDataFetched, setIsDataFetched] = useState(false);
    const[oldYear, setOldYear] = useState()
    const[oldMonth, setOldMonth] = useState()

    return (
        <MonthDetailsContext.Provider value={{
            arrayRevenues, setArrayRevenues,
            arrayEssential, setArrayEssential,
            arrayNoEssential, setArrayNoEssential,
            arrayInvestments, setArrayInvestments,
            arrayCreditCard, setArrayCreditCard,
            monthDescription, setMonthDescription,
            totalExpenses, setTotalExpenses,
            valuePercentsInvestiments, setValuePercentsInvestiments,
            valuePercentsEssentials, setValuePercentsEssentials,
            valuePercentsNonEssentials, setValuePercentsNonEssentials,
            isDataFetched, setIsDataFetched,
            oldYear, setOldYear,
            oldMonth, setOldMonth
        }}>
            {children}
        </MonthDetailsContext.Provider>
    );
};
