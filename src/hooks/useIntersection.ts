import { useEffect, useState } from 'react';

const useIntersection = (
    loadingRef: React.MutableRefObject<HTMLDivElement | null>,
    bottomBoundaryRef: React.MutableRefObject<HTMLDivElement | null>,
    onLoadMore: () => void
) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0,
    };

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        if (loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            if (loadingRef.current) {
                observer.unobserve(loadingRef.current);
            }
        };
    }, [loadingRef]);

    useEffect(() => {
        if (isIntersecting) {
            onLoadMore();
        }
    }, [isIntersecting, onLoadMore]);

    useEffect(() => {
        const handleScroll = () => {
            const bottomBoundaryRect =
                bottomBoundaryRef.current?.getBoundingClientRect();
            if (
                bottomBoundaryRect &&
                bottomBoundaryRect.top <= window.innerHeight
            ) {
                onLoadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [bottomBoundaryRef, onLoadMore]);
};

export default useIntersection;
