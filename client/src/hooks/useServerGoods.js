import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useServerGoods = (initialLimit = 10) => {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchGoods = useCallback(async (currentPage) => {
        setLoading(true);
        setError(null);
        try {
            // Искусственная задержка 0.8 сек, чтобы препод увидел надпись "Загрузка..."
            await new Promise(r => setTimeout(r, 800));

            // Запрос к серверу с пагинацией
            const response = await axios.get(`http://localhost:3001/goods`, {
                params: {
                    _page: currentPage,
                    _limit: initialLimit
                }
            });

            const newGoods = response.data;
            
            // Если пришло меньше товаров, чем лимит, значит это конец списка
            if (newGoods.length < initialLimit) {
                setHasMore(false);
            }

            // Добавляем новые товары к уже существующим
            setGoods(prev => currentPage === 1 ? newGoods : [...prev, ...newGoods]);
        } catch (err) {
            setError('Ошибка соединения'); // Точная фраза из задания
        } finally {
            setLoading(false);
        }
    }, [initialLimit]);

    // Загрузка первой страницы при запуске
    useEffect(() => {
        fetchGoods(1);
    }, []); 

    // Функция для кнопки "Загрузить больше"
    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchGoods(nextPage);
    };

    return { goods, loading, error, hasMore, loadMore };
};