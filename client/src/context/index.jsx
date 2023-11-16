// File: DataContext.js
import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [exBookId, setExBookId] = useState('');

    const setExBookIdContext = (id) => {
        setExBookId(id);
    };

    return (
        <DataContext.Provider value={{ exBookId, setExBookIdContext }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    return useContext(DataContext);
};