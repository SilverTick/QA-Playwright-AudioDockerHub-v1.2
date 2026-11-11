import { Page, Locator } from "@playwright/test";

export class BasePage {
  constructor(protected readonly page: Page) {}
  get getPage(): Page {
    return this.page;
  }
  async scrollUntil(locator: Locator, maxScrolls = 10) {
    for (let i = 0; i < maxScrolls; i++) {
      await this.page.mouse.wheel(0, 500);
      await this.page.waitForTimeout(1000);
      if (await locator.isVisible()) {
        return;
      }
    }
    throw new Error("Element not found after scrolling.");
  }
}
