import { useEffect, useState } from 'react';

export const useKeyLongPressed = (): [string] => {
  const [keyLongPressed, setKeyLongPressed] = useState('');

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const handleKeyDown = (event: KeyboardEvent) => {
        timerId = setTimeout(() => {
          setKeyLongPressed(event.key);
        }, 300);
    };
    const handleKeyUp = () => {
      clearTimeout(timerId);
      setKeyLongPressed('')
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      clearTimeout(timerId);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  },[]);

  return [keyLongPressed];
};
