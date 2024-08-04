import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen] = useState(false);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [droppedBuildings, setDroppedBuildings] = useState([]);

    return (
        <AppContext.Provider value={{ 
            isDirty, setIsDirty, 
            isSidebarOpen, setIsSidebarOpen, 
            isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen, 
            selectedBuildings, setSelectedBuildings, 
            droppedBuildings, setDroppedBuildings 
        }}>
            {children}
        </AppContext.Provider>
    );
};
