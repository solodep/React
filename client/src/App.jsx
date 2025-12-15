import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import GoodsPage from './pages/GoodsPage';
import GoodDetailPage from './pages/GoodDetailPage';

// Простой глобальный стиль
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Приватные маршруты */}
        <Route path="/goods" element={
            <ProtectedRoute>
              <GoodsPage />
            </ProtectedRoute>
        } />
        <Route path="/goods/:id" element={
            <ProtectedRoute>
              <GoodDetailPage />
            </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;