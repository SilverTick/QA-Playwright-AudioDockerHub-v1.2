import { test, Page } from "@playwright/test";
import { attachScreenshot } from "./allureHelper";

export async function testStepWithScreenshot(
  title: string,
  page: Page,
  fn: (page: Page) => Promise<void>,
) {
  await test.step(title, async () => {
    await fn(page);
    await page.waitForLoadState("load");
    await attachScreenshot(page, `Screenshot - ${title}`);
  });
}
