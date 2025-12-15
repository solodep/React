import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoodDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [good, setGood] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/goods/${id}`)
            .then(res => setGood(res.data))
            .catch(err => alert('Ошибка загрузки товара'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ padding: '20px' }}>Загрузка...</div>;
    if (!good) return <div style={{ padding: '20px' }}>Товар не найден</div>;

    return (
        <div style={{ padding: '40px', maxWidth: '600px' }}>
            <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Назад</button>
            <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <h1>{good.title}</h1>
                <p style={{ fontSize: '18px' }}><b>Цена:</b> {good.price} руб.</p>
                <p><b>Дата выпуска:</b> {good.date}</p>
                <hr />
                <p><b>Описание:</b> {good.description}</p>
            </div>
        </div>
    );
};
export default GoodDetailPage;