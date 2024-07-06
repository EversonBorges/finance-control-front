import React, { createContext, useState } from 'react';

export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [summaryYear, setSummaryYear] = useState([]);
    const [summaryMonth, setSummaryMonth] = useState([]);
    const [totalRevenues, setTotalRevenues] = useState("");

    return (
        <SummaryContext.Provider value={{
            selectedYear,
            setSelectedYear,
            summaryYear,
            setSummaryYear,
            summaryMonth,
            setSummaryMonth,
            totalRevenues,
            setTotalRevenues
        }}>
            {children}
        </SummaryContext.Provider>
    );
};
