/**
 * Constructs a formatted error message string with an optional context.
 *
 * @param name - The name or type of the error.
 * @param desc - A description of the error.
 * @param context - Optional additional context to include in the error message. If provided, it will be stringified as JSON.
 * @returns The formatted error message string.
 */
export const makeErrorMessage = (name: string, desc: string, context?: any) =>
  context !== undefined
    ? `${name}: ${desc}\n${JSON.stringify(context, null, 2)}`
    : `${name}: ${desc}`;
