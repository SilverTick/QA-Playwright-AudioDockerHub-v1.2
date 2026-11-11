import "./config/loadEnv";
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  expect: {
    timeout: 30000,
  },
  use: {
    actionTimeout: 30000,
    navigationTimeout: 30000,
    baseURL: process.env.BASE_URL,
    launchOptions: { args: ["--start-maximized"] },
    viewport: null,
    // viewport: {
    //   width: 1920,
    //   height: 1080,
    // },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  // projects: [
  //   {
  //     name: "chromium",
  //     use: {
  //       ...devices["Desktop Chrome"],
  //     },
  //   },
  // ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: [["html"]],
  reporter: [["line"], ["allure-playwright", { resultsDir: "allure-results" }]],
});
