// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen] = useState(false);
    // const [anotherState, setAnotherState] = useState(''); // Add more states as needed

    return (
        <AppContext.Provider value={{ isDirty, setIsDirty, isSidebarOpen, setIsSidebarOpen, isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen}}>
            {children}
        </AppContext.Provider>
    );
};
