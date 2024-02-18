import { useEffect } from 'react';

export function useOutsideAlerter(
    ref: React.RefObject<HTMLInputElement>,
    handleOutsideClick: () => void
) {
    useEffect(() => {
        function handleClickOutside(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleOutsideClick();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
}
