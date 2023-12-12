/* eslint-disable @typescript-eslint/no-explicit-any */
export type AsyncReturn<T extends (...args: any) => any> = Awaited<ReturnType<T>>;
export type Nullish = null | undefined;
