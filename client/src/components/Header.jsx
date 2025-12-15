import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { user, signout } = useAuth();
    const styleLink = { marginRight: '15px', textDecoration: 'none', color: '#333' };

    return (
        <header style={{ padding: '20px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', justifyContent: 'space-between' }}>
            <nav>
                <Link to="/" style={styleLink}>Главная</Link>
                <Link to="/goods" style={styleLink}>Каталог товаров</Link>
            </nav>
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: '10px' }}>Вы вошли как: <b>{user}</b></span>
                        <button onClick={() => signout(() => {})}>Выйти</button>
                    </>
                ) : (
                    <Link to="/login" style={styleLink}>Войти</Link>
                )}
            </div>
        </header>
    );
};
export default Header;