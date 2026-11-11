import { BasePage } from "./basePage";
import { Locator } from "@playwright/test";

export class HomePage extends BasePage {
  get usernameTxt(): Locator {
    return this.page.locator(".jss17");
  }
}
