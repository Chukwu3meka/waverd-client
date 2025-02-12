import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true /* Run tests in files in parallel */,
  retries: process.env.CI ? 2 : 0 /* Retry on CI only */,
  workers: process.env.CI ? 4 : undefined /* Opt out of parallel tests on CI. */,
  reporter: [["html", { open: "never" }]] /* Reporter to use. See https://playwright.dev/docs/test-reporters */,
  forbidOnly: !!process.env.CI /* Fail the build on CI if you accidentally left test.only in the source code. */,
  use: {
    baseURL: process.env.CI ? process.env.PREVIEW_URL : "http:localhost:8081",
    trace: "on-first-retry" /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */,
  },

  projects: [
    /* Configure projects for major browsers */
    // { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // { name: "firefox", use: { ...devices["Desktop Firefox"] } },

    // /* Test against mobile viewports. */
    // { name: "Mobile Chrome", use: { ...devices["Pixel 5"] } },
    { name: "Mobile Safari", use: { ...devices["iPhone 12"] } },
  ],
});
