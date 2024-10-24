import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen] = useState(false);
    const [selectedBuildings, setSelectedBuildings] = useState([]);
    const [droppedBuildings, setDroppedBuildings] = useState([]);
    const [drawerContent, setDrawerContent] = useState('default');
    const [openProject, setOpenProject] = useState(false);
    const [confirmSave, setConfirmSave] = useState(false);
    const [token, setToken] = useState("");
    const [contactResource, setContactResource] = useState([]);



    const toggleDrawer = (content = 'default') => {
        if (openProject) {
            if (drawerContent === content) {
                setOpenProject(false); // Close the drawer if the content is the same
            } else {
                setDrawerContent(content); // Update the content if it's different
            }
        } else {
            setDrawerContent(content);
            setOpenProject(true); // Open the drawer if it was closed
        }
    };
    

    return (
        <AppContext.Provider value={{
            isDirty, setIsDirty,
            isSidebarOpen, setIsSidebarOpen,
            isCollapsed2dSearchOpen, setIsCollapsed2dSearchOpen,
            selectedBuildings, setSelectedBuildings,
            droppedBuildings, setDroppedBuildings,
            openProject, toggleDrawer, drawerContent,
            confirmSave, setConfirmSave,
            token, setToken,
            contactResource, setContactResource
        }}>
            {children}
        </AppContext.Provider>
    );
    
};
