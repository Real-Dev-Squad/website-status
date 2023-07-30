import { renderHook } from '@testing-library/react-hooks';
import useIntersection from './../../../src/hooks/useIntersection';
import { MutableRefObject } from 'react';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
});

describe('useIntersection', () => {
    let loadingRef: MutableRefObject<HTMLDivElement | null>;
    let bottomBoundaryRef: MutableRefObject<HTMLDivElement | null>;
    let onLoadMore: jest.Mock<any, any>;

    beforeEach(() => {
        loadingRef = { current: document.createElement('div') };
        bottomBoundaryRef = { current: document.createElement('div') };
        onLoadMore = jest.fn();
        window.IntersectionObserver = mockIntersectionObserver;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should observe the loadingRef element', () => {
        renderHook(() =>
            useIntersection(loadingRef, bottomBoundaryRef, onLoadMore)
        );
        expect(mockIntersectionObserver).toHaveBeenCalledTimes(1);
        expect(mockIntersectionObserver).toHaveBeenCalledWith(
            expect.any(Function),
            { root: null, rootMargin: '0px', threshold: 0 }
        );
    });

    it('should add and remove event listener for the scroll event', () => {
        const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
        const removeEventListenerSpy = jest.spyOn(
            window,
            'removeEventListener'
        );
        const { unmount } = renderHook(() =>
            useIntersection(loadingRef, bottomBoundaryRef, onLoadMore)
        );
        expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
        expect(addEventListenerSpy).toHaveBeenCalledWith(
            'scroll',
            expect.any(Function)
        );
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'scroll',
            expect.any(Function)
        );
        addEventListenerSpy.mockRestore();
        removeEventListenerSpy.mockRestore();
    });

    it('should call onLoadMore when scroll reaches the bottom boundary', () => {
        const handleScroll = jest.fn();
        const addEventListenerSpy = jest
            .spyOn(window, 'addEventListener')
            .mockImplementation((event, cb) => {
                if (event === 'scroll') {
                    handleScroll.mockImplementation(cb as any);
                }
            });
        renderHook(() =>
            useIntersection(loadingRef, bottomBoundaryRef, onLoadMore)
        );
        const bottomBoundaryRect = {
            top: window.innerHeight,
        };
        Object.defineProperty(
            bottomBoundaryRef.current,
            'getBoundingClientRect',
            {
                value: () => bottomBoundaryRect,
            }
        );
        handleScroll();
        expect(onLoadMore).toHaveBeenCalledTimes(1);
        addEventListenerSpy.mockRestore();
    });
});
