export const cleanStackTraceReactNative = (stack: string) =>
  stack
    .split("\n")
    .filter((line) => line.includes("@"))
    .map((line) => line.split("@")[0])
    .join("\n");
