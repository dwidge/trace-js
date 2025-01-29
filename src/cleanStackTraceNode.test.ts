import { test } from "node:test";
import { expect } from "expect";
import { cleanStackTraceNode } from "./cleanStackTraceNode.js";

test("testCleanTrace", async () => {
  const cwd = "file:///home/user/project/";
  expect(
    cleanStackTraceNode(
      `Error
    at new GenericError (${cwd}lib/error/GenericError.ts:16:42)
    at new EmailNotFoundError (${cwd}src/utils/Error.js:81:5)
    at getUserByEmail (${cwd}src/utils/User.js:36:20)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
    at async login (${cwd}src/controllers/Login.ts:7:15)
    `,
      cwd,
    ),
  ).toBe(`Error
    at new GenericError (lib/error/GenericError.ts:16:42)
    at new EmailNotFoundError (src/utils/Error.js:81:5)
    at getUserByEmail (src/utils/User.js:36:20)
    at async login (src/controllers/Login.ts:7:15)
    `);
});
