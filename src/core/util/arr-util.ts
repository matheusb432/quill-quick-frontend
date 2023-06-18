function arrayFrom(items: number, increment = 0) {
  if (!items) return [];

  return Array.from(Array(items).keys()).map((i) => i + increment);
}

function isEmpty(arr: unknown[]): boolean {
  return !arr || arr.length === 0;
}

export const arrUtil = {
  isEmpty,
  arrayFrom,
};
