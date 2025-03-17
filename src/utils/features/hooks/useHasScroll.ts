import { useEffect, useState, useRef } from 'react';

interface sa {
    containerRef: HTMLDivElement;
    setHasScroll: () => void;
    hasScroll: boolean;
}

const useHasScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hasScroll, setHasScroll] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const checkScroll = () => {
            // Проверяем, есть ли горизонтальный скролл
            console.log('Checking scroll...');
            const hasHorizontalScroll = container.scrollWidth > container.clientWidth;
            setHasScroll(hasHorizontalScroll);
        };

        // Проверяем скролл при изменении размеров контейнера
        const observer = new ResizeObserver(checkScroll);
        observer.observe(container);

        // Первоначальная проверка
        checkScroll();

        // Очистка при размонтировании
        return () => observer.disconnect();
    }, []);

    return { containerRef, hasScroll };
};

export default useHasScroll;
