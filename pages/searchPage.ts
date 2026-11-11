import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class SearchPage extends BasePage {
  get searchInput(): Locator {
    return this.page.locator(".search-input").getByRole("textbox");
  }
  searchInputValue(product: string): Locator {
    return this.page.locator(".search-input").locator(`[value="${product}"]`);
  }
  get searchResults(): Locator {
    return this.page.locator(".search-results");
  }
  selectedProduct(product: string): Locator {
    return this.searchResults
      .locator(".product-item", { hasText: product })
      .first();
  }
  async enterProductSearch(product: string): Promise<void> {
    await this.searchBar.fill(product);
    await this.searchBar.press("Enter");
  }
  async addSelectedProductToCart(product: string): Promise<void> {
    await this.selectedProduct(product)
      .getByRole("button", { name: "Add to cart" })
      .click();
  }
}
