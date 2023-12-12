function arrayFrom(items: number, increment = 0) {
  if (!items) return [];

  return Array.from(Array(items).keys()).map((i) => i + increment);
}

function isEmpty(arr: unknown[]): boolean {
  return !arr || arr.length === 0;
}

function removeDuplicates<T>(arr: T[]): T[] {
  if (!arr?.length) return [];
  return [...new Set(arr)];
}

export const arrUtil = {
  isEmpty,
  arrayFrom,
  removeDuplicates,
};
