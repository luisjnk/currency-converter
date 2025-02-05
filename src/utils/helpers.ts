export const formatToNumber = (entry: string) => {
  return Number(entry.split(',').join(''));
};

export const isValid = (entry: string) => {
  const regexp = /^\d+(\.\d{1,2})?$/;
  return regexp.test(formatToNumber(entry).toString());
};

export const formatToLocaleString = (entry: string) => {
  if (entry.length === 0) return '';

  if (!isValid(entry))
    throw new Error('The entry cannot be formatted. Invalid input string.');

  if (entry.slice(-1) === '.') return entry;

  return formatToNumber(entry).toLocaleString('en-US');
};

export function debounce(func: Function, delay: number) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return function (this: any, ...args: any) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
