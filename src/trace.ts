import { makeErrorMessage } from "./makeErrorMessage.js";

export const trace = <T extends (...args: any[]) => any>(
  name: string,
  fn: T,
  getContext: (...args: Parameters<T>) => any = (...args: Parameters<T>) =>
    args.length <= 1 ? args[0] : args,
): T =>
  ((...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args);
    } catch (error) {
      throw new Error(
        makeErrorMessage(name, String(error), getContext(...args)),
        {
          cause: {
            error,
            context: JSON.stringify(getContext(...args)),
          },
        },
      );
    }
  }) as T;

export const traceAsync = <T extends (...args: any[]) => Promise<any>>(
  name: string,
  fn: T,
  getContext: (...args: Parameters<T>) => any = (...args: Parameters<T>) =>
    args.length <= 1 ? args[0] : args,
): T =>
  (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(
        makeErrorMessage(name, String(error), getContext(...args)),
        {
          cause: {
            error,
            context: JSON.stringify(getContext(...args)),
          },
        },
      );
    }
  }) as T;
