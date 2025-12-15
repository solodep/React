import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        // Если не вошел, редирект на логин, но запоминаем откуда пришел
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};
export default ProtectedRoute;