import { test, expect } from "@playwright/test";

// test("Page is reachable", async ({ page }) => {
//   await page.goto("/");

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/WaveRD/);

//   // // const welcomeScreen = await page.getByTestId("welcome");
//   // const logo = page.locator('[href="/fff"');

//   // await expect(logo).toBeVisible();
//   // await expect(logo).toHaveAttribute("title", "quaas hgdhgd");

//   // // await welcomeScreen.hover();

//   // const apihub = await page.getByTestId("apihub");

//   // await apihub.scrollIntoViewIfNeeded();
//   // await apihub.click();

//   // await page.goto("");

//   // Click the get started link.
//   // await page.getByRole("link", { name: "Get started" }).click();

//   // Expects page to have a heading with the name of Installation.
//   // await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
// });

// test("Header reacts to scroll events", async ({ page, isMobile }) => {
test("Home page works just fine", async ({ page, isMobile }) => {
  await page.goto("/");

  // Wait for page to be server rendered
  await page.waitForTimeout(3000);

  await page.evaluate(() => {
    window.scrollTo(0, document.querySelector("body")!.scrollHeight); // Scroll to bottom of page
  });

  const stickyHeaderSelector = page.getByTestId("stickyHeader");
  await expect(stickyHeaderSelector, "Sticky Header should be visible when users scroll to the bottom of the page").toBeVisible();

  await page.keyboard.press("PageUp"); // Scroll down a page
  await page.waitForTimeout(500); // Pause for effect
  await expect(stickyHeaderSelector, "Sticky Header should be visible when users scroll/scrolling upwards").toBeVisible();

  // ? PageUp scrolls further compared to ArrowUp

  await page.keyboard.press("ArrowDown"); // Scroll down a page
  await page.waitForTimeout(500); // Pause for effect
  await expect(stickyHeaderSelector, "Sticky Header should be hidden when users scroll/scrolling downwards").not.toBeVisible();

  await page.keyboard.press("ArrowUp"); // Scroll down a page
  await page.waitForTimeout(500); // Pause for effect
  await expect(stickyHeaderSelector, "Sticky Header should be visible when users scroll/scrolling upwards").toBeVisible();

  await page.evaluate(() => {
    window.scrollTo(0, 0); // Scroll to top of page
  });

  await expect(stickyHeaderSelector, "Sticky Header should be hidden when users scroll to the top of the page").not.toBeVisible();

  if (isMobile) {
  }
});
