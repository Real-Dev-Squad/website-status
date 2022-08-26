function debounce<Args = any, Return = void>(
  fn: (args: Args) => Return,
  ms: number
): [(args: Args) => Promise<Return>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args: Args): Promise<Return> =>
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

export const useDebounce = <Args = any, Return = void>(
  fn: (args: Args) => Return,
  ms: number
): ((args: Args) => Promise<Return>) => {
  const [debouncedFun, teardown] = debounce<Args, Return>(fn, ms);

  return debouncedFun;
};
