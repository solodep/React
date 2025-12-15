import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();
    const from = location.state?.from?.pathname || '/goods';

    const handleSubmit = (event) => {
        event.preventDefault();
        const user = event.target.username.value;
        signin(user, () => navigate(from, { replace: true }));
    };

    return (
        <div style={{ padding: '40px', maxWidth: '300px', margin: '0 auto' }}>
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input name="username" placeholder="Введите логин" required style={{ padding: '8px' }} />
                <button type="submit" style={{ padding: '8px' }}>Войти</button>
            </form>
        </div>
    );
};
export default LoginPage;