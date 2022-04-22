// use this file to add more setup options before each test
import "@testing-library/jest-dom/extend-expect";
import { loadEnvConfig } from "@next/env";

// Load env variables from .env.test
const projectDir = process.cwd();
loadEnvConfig(projectDir);
