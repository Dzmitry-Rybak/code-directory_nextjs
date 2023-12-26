"use client"
import { createContext, useContext, useState } from 'react';

// используется для обертывания корневого уровня приложения и предоставления значений контекста для всех вложенных компонентов.
const AppStateContext = createContext();

export const AppStateProvider = ({ children }) => {
    const [burgerToggle, setBurgerToggle] = useState(false);
    
    const onToggleBurger = () => {
        setBurgerToggle(state => !state);
    }

    return (
        <AppStateContext.Provider value={{ burgerToggle, onToggleBurger }}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => {
    return useContext(AppStateContext); // useContext вытаскивает значения из контекста
};
