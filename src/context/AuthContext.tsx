import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

interface AuthContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated:Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextProps >({
    isAuthenticated:false,
    setIsAuthenticated: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};


