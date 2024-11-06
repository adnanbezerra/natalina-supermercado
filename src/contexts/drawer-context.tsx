import React, { createContext, useState } from "react";

export const DrawerContext = createContext<any>(undefined);

export const DrawerProvider = ({ children }: { children: React.ReactNode }) => {
    const [openDrawer, setOpenDrawer] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    return (
        <DrawerContext.Provider value={{ openDrawer, setOpenDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

export const useDrawer = () => {
    const context = React.useContext(DrawerContext);
    if (context === undefined) {
        throw new Error("useDrawer must be used within a DrawerProvider");
    }
    return context;
};
