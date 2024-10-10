export const trace = <T extends (...args: any[]) => any>(
  message: string,
  fn: T,
  getContext: (...args: Parameters<T>) => any = (...args: Parameters<T>) => args
): T =>
  ((...args: Parameters<T>): ReturnType<T> => {
    try {
      return fn(...args);
    } catch (error) {
      throw new Error(`${message}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: {
          error,
          context: getContext(...args),
        },
      });
    }
  }) as T;

export const traceAsync = async <T extends (...args: any[]) => Promise<any>>(
  message: string,
  fn: T,
  getContext: (...args: Parameters<T>) => any = (...args: Parameters<T>) => args
): Promise<T> =>
  (async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      throw new Error(`${message}: ${error instanceof Error ? error.message : String(error)}`, {
        cause: {
          error,
          context: getContext(...args),
        },
      });
    }
  }) as T;
