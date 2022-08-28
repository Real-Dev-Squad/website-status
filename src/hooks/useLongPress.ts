import { useEffect, useState } from 'react';

export const useLongPress = (
  key: string,
  delay: number,
  callback: () => void = () => ''
): [boolean] => {
  const [isLongAltKeyPressed, setIsLongAltKeyPressed] = useState(false);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: any) => {
      if (e.key === key) {
        timerId = setTimeout(() => {
          setIsLongAltKeyPressed(true);
          if (callback) {
            callback();
          }
        }, delay);
      }
    };

    const handleKeyUp = () => {
      clearTimeout(timerId);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      clearTimeout(timerId);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [key, delay, callback]);

  return [isLongAltKeyPressed];
};
