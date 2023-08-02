import { renderHook } from '@testing-library/react-hooks';
import useIntersection from './../../../src/hooks/useIntersection';

describe('useIntersection', () => {
    const onLoadMore = jest.fn();
    const loadingRef = {
        current: document.createElement('div'),
    };

    it('should observe the loadingRef element', () => {
        const { unmount } = renderHook(() =>
            useIntersection({
                loadingRef,
                onLoadMore,
            })
        );

        expect(loadingRef.current).toBeDefined();
        expect(onLoadMore).not.toHaveBeenCalled();
        unmount();
    });

    it('should not create the observer when earlyReturn is true', () => {
        window.IntersectionObserver = jest.fn((callback) => ({
            observe: jest.fn(),
            disconnect: jest.fn(),
        }));

        const { unmount } = renderHook(() =>
            useIntersection({
                loadingRef,
                onLoadMore,
                earlyReturn: true,
            })
        );

        expect(loadingRef.current).toBeDefined();
        expect(onLoadMore).not.toHaveBeenCalled();
        expect(IntersectionObserver).not.toHaveBeenCalled();
        unmount();
    });

    it('should disconnect the observer when unmounting', () => {
        const disconnect = jest.fn();

        window.IntersectionObserver = jest.fn((callback) => ({
            observe: jest.fn(),
            disconnect,
        }));

        const { unmount } = renderHook(() =>
            useIntersection({
                loadingRef,
                onLoadMore,
            })
        );

        expect(loadingRef.current).toBeDefined();
        expect(onLoadMore).not.toHaveBeenCalled();
        expect(disconnect).not.toHaveBeenCalled();
        unmount();
        expect(disconnect).toHaveBeenCalled();
    });

    it('should call onLoadMore when the element is intersecting', () => {
        let observerCallback;

        class IntersectionObserverMock {
            constructor(callback) {
                observerCallback = callback;
            }

            unobserve: () => null;
            disconnect: () => null;
        }

        window.IntersectionObserver = IntersectionObserverMock;

        const { unmount } = renderHook(() =>
            useIntersection({
                loadingRef,
                onLoadMore,
            })
        );

        expect(loadingRef.current).toBeDefined();
        expect(onLoadMore).not.toHaveBeenCalled();
        observerCallback([
            {
                isIntersecting: true,
            },
        ]);

        expect(onLoadMore).toHaveBeenCalled();
        unmount();
    });
});
