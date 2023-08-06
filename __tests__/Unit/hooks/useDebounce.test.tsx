import { act, renderHook } from '@testing-library/react-hooks';
import useDebounce from '../../../src/hooks/useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
    it('should return the initial value immediately', () => {
        const { result } = renderHook(() => useDebounce('initial', 500));

        expect(result.current).toBe('initial');
    });

    it('should debounce the value update and return the final value after the delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        act(() => {
            rerender({ value: 'updated', delay: 500 });
        });
        expect(result.current).toBe('initial');

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');
    });

    it('should reset the timer when the value changes before the delay', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        act(() => {
            rerender({ value: 'updated', delay: 500 });
        });

        expect(result.current).toBe('initial');

        act(() => {
            jest.advanceTimersByTime(250);
        });

        act(() => {
            rerender({ value: 'final', delay: 500 });
        });
        expect(result.current).toBe('initial');

        act(() => {
            jest.advanceTimersByTime(250);
        });
        expect(result.current).toBe('initial');
    });
});
