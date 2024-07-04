import React, { createContext, useState } from 'react';

export const SummaryContext = createContext();

export const SummaryProvider = ({ children }) => {
    const [selectedYear, setSelectedYear] = useState(null);

    return (
        <SummaryContext.Provider value={{ selectedYear, setSelectedYear }}>
            {children}
        </SummaryContext.Provider>
    );
};
