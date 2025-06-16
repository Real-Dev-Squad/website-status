import { debounce } from '@/utils/common';


describe('debounce', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('should call the callback after the specified delay', () => {
        const mockCallback = jest.fn();
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn('test');

        expect(mockCallback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(1000);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith('test');
    });

    test('should reset the timer when called multiple times', () => {
        const mockCallback = jest.fn();
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn('first');
        jest.advanceTimersByTime(500);

        debouncedFn('second');
        jest.advanceTimersByTime(500);

        expect(mockCallback).not.toHaveBeenCalled();

        jest.advanceTimersByTime(500);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith('second');
    });

    test('should pass multiple arguments correctly', () => {
        const mockCallback = jest.fn();
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn('arg1', 'arg2', 123);

        jest.advanceTimersByTime(1000);

        expect(mockCallback).toHaveBeenCalledWith('arg1', 'arg2', 123);
    });

    test('should handle multiple rapid calls and only execute the last one', () => {
        const mockCallback = jest.fn();
        const debouncedFn = debounce(mockCallback, 1000);

        debouncedFn('call1');
        debouncedFn('call2');
        debouncedFn('call3');
        debouncedFn('call4');

        jest.advanceTimersByTime(1000);

        expect(mockCallback).toHaveBeenCalledTimes(1);
        expect(mockCallback).toHaveBeenCalledWith('call4');
    });
});
