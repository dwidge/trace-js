export const cleanStackTraceNode = (stack: string, cwd?: string) =>
  cleanPaths(stripStack(stack), cwd);

const stripStack = (stack: string) =>
  stack.replace(/.*(?:node_modules|node:).*/g, "").replace(/\n+/g, "\n");

function cleanPaths(inputString: string, cwd = ""): string {
  const pathRegex = /file:\/\/\/([A-Za-z]:[\\/][^:\s)]+)/g;

  const relativeString = inputString.replace(pathRegex, (match, filePath) =>
    filePath.replace(/\\/g, "/").replace(cwd, ""),
  );

  return relativeString;
}
