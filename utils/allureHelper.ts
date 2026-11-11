import { test, Page } from "@playwright/test";

export async function attachText(name: string, content: string) {
  await test.info().attach(name, {
    body: content,
    contentType: "text/plain",
  });
}

export async function attachScreenshot(page: Page, name: string) {
  let screenshot;
  if (process.env.SAVE_DEBUG_SCREENSHOTS === "true") {
    const tcFolder = test.info().title.match(/^TC\d+/)?.[0] || "Unknown";
    screenshot = await page.screenshot({
      path: `screenshots/${tcFolder}/${name}.png`,
      fullPage: true,
    });
  } else {
    screenshot = await page.screenshot({ fullPage: true });
  }
  await test.info().attach(name, {
    body: screenshot,
    contentType: "image/png",
  });
}
