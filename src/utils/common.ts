export function debounce(func: Function, delay: number) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}