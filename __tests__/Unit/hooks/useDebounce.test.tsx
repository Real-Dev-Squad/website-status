import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from '@/hooks/useDebounce';
import React from 'react';
import { render, waitFor } from '@testing-library/react';

jest.useFakeTimers();
let cleanupFunc: any;

jest.spyOn(React, 'useEffect').mockImplementationOnce((func) => {
    cleanupFunc = func();
});

describe('useDebounce', () => {
    test('should return the initial value immediately', () => {
        const initialValue = 'hello';
        const { result } = renderHook(() => useDebounce(initialValue, 500));

        expect(result.current).toBe(initialValue);
    });

    test('should return the updated value after delay', async () => {
        renderHook(() => useDebounce('hello world', 500));

        // Second render with "world"

        await waitFor(() => {
            const { result } = renderHook(() => useDebounce('pratiyush', 500));
            jest.advanceTimersByTime(300); // Move the timers forward by another 200ms, total 500ms
            expect(result.current).toBe('pratiyush');
        });

        await waitFor(() => {
            const { result } = renderHook(() => useDebounce('world', 500));
            jest.advanceTimersByTime(200); // Move the timers forward by another 200ms, total 500ms
            expect(result.current).toBe('world');
        });
    });
});
