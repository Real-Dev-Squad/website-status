import { useEffect } from 'react';

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
};

interface IntersectionProps {
    loadingRef: React.MutableRefObject<HTMLDivElement | null>;
    onLoadMore: () => void;
    earlyReturn?: boolean;
}

const useIntersection = ({
    loadingRef,
    onLoadMore,
    earlyReturn = false,
}: IntersectionProps) => {
    useEffect(() => {
        if (earlyReturn) {
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onLoadMore();
            }
        }, options);

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [loadingRef, onLoadMore]);
};

export default useIntersection;
