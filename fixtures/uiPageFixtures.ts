import { test as base, expect } from "@playwright/test";
import { BasePage } from "../pages/basePage";
import { HomePage } from "../pages/homePage";
import { LoginPage } from "../pages/loginPage";
import { SearchPage } from "../pages/searchPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from "../pages/checkoutPage";
import { OrderDetailsPage } from "../pages/orderDetailsPage";

type uiPageFixtures = {
  basePage: BasePage;
  homePage: HomePage;
  loginPage: LoginPage;
  searchPage: SearchPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  orderDetailsPage: OrderDetailsPage;
};
export const test = base.extend<uiPageFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchPage: async ({ page }, use) => {
    await use(new SearchPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  orderDetailsPage: async ({ page }, use) => {
    await use(new OrderDetailsPage(page));
  },
});
export { expect };
