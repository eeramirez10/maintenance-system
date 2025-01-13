// src/components/ProtectedRoute.tsx
import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from './hooks/useAuth';


const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    // const { isAuthenticated } = useAuth();

    // console.log(isAuthenticated)

    // if (!isAuthenticated) {
    //     return <Navigate to="/login" />;
    // }

    return children;
};

export default ProtectedRoute;
