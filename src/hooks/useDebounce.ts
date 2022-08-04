import { useEffect } from "react";


function debounce<A = any, R = void>(
    fn: (args: A) => R,
    ms: number
): [(args: A) => Promise<R>, () => void] {
    let timer: NodeJS.Timeout;

    const debouncedFunc = (args: A): Promise<R> =>
        new Promise((resolve) => {
            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                resolve(fn(args));
            }, ms);
        });

    const teardown = () => clearTimeout(timer);

    return [debouncedFunc, teardown];
}

export const useDebounce = <A = any, R = void>(
    fn: (args: A) => R,
    ms: number
): ((args: A) => Promise<R>) => {
    const [debouncedFun, teardown] = debounce<A, R>(fn, ms);

    // useEffect(() => () => teardown(), []);

    return debouncedFun;
};