import "@testing-library/jest-dom/vitest";
import { afterAll, afterEach, beforeAll } from "vitest";
import { apiServer } from "./src/test/server";

beforeAll(() => apiServer.listen());
afterAll(() => apiServer.close());
afterEach(() => apiServer.resetHandlers());
