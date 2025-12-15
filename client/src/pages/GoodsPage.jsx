import React from 'react';
import { Link } from 'react-router-dom';
import { useServerGoods } from '../hooks/useServerGoods';

const GoodsPage = () => {
    // Вызываем хук. Начальный лимит = 10 (по заданию)
    const { goods, loading, error, hasMore, loadMore } = useServerGoods(10);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Каталог молочной продукции</h2>
            
            {/* Ошибка соединения */}
            {error && <div style={{ color: 'red', margin: '20px', fontSize: '18px' }}>{error}</div>}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                {goods.map((item) => (
                    <div key={item.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', background: '#fff' }}>
                        <h3>{item.title}</h3>
                        <p>Цена: <b>{item.price} руб.</b></p>
                        <Link to={`/goods/${item.id}`} style={{ color: 'blue' }}>Подробнее</Link>
                    </div>
                ))}
            </div>

            {/* Сообщение Загрузка */}
            {loading && <div style={{ textAlign: 'center', margin: '20px', fontSize: '18px', color: 'gray' }}>Загрузка...</div>}

            {/* Кнопка загрузить больше (только если не грузится и есть еще товары) */}
            {!loading && hasMore && !error && (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button onClick={loadMore} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
                        Загрузить больше
                    </button>
                </div>
            )}
        </div>
    );
};
export default GoodsPage;