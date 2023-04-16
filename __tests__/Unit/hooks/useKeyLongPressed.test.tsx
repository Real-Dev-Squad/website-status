import { act, renderHook } from '@testing-library/react-hooks';
import { useKeyLongPressed } from '../../../src/hooks/useKeyLongPressed';

jest.useFakeTimers();
describe('useKeyLongPressed', () => {
    it('should return an empty string when no keys are pressed', () => {
        const { result } = renderHook(() => useKeyLongPressed());

        expect(result.current[0]).toBe('');
    });

    it('should set the keyLongPressed state when a key is held down for 300ms', () => {
        const { result } = renderHook(() => useKeyLongPressed());

        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'a' });
            document.dispatchEvent(event);
            jest.advanceTimersByTime(300);
        });

        expect(result.current[0]).toBe('a');
    });

    it('should clear the keyLongPressed state when the key is released before 300ms', () => {
        const { result } = renderHook(() => useKeyLongPressed());

        act(() => {
            const event = new KeyboardEvent('keydown', { key: 'a' });
            document.dispatchEvent(event);
            jest.advanceTimersByTime(100);
            const upEvent = new KeyboardEvent('keyup');
            document.dispatchEvent(upEvent);
        });

        expect(result.current[0]).toBe('');
    });

    it('should remove event listeners when the component unmounts', () => {
        const removeEventListenerSpy = jest.spyOn(
            document,
            'removeEventListener'
        );

        const { unmount } = renderHook(() => useKeyLongPressed());
        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledTimes(2);
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keydown',
            expect.any(Function)
        );
        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'keyup',
            expect.any(Function)
        );

        removeEventListenerSpy.mockRestore();
    });
});
