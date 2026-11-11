import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  get carts(): Locator {
    return this.page.locator("table.cart");
  }
  selectedCartItem(item: string): Locator {
    return this.page.locator(".cart-item-row", { hasText: item }).first();
  }
  cartItemRow(productName: string): Locator {
    return this.page.locator("tr.cart-item-row").filter({
      has: this.page.locator(".product-name", { hasText: productName }),
    });
  }
  cartItemPrice(itemRow: Locator): Locator {
    return itemRow.locator(".product-unit-price");
  }
  cartItemQuantity(itemRow: Locator): Locator {
    return itemRow.locator(".qty.nobr input");
  }
  cartItemSubTotal(itemRow: Locator): Locator {
    return itemRow.locator(".product-subtotal");
  }
  get cartTotalRowNames(): Locator {
    return this.page.locator(".cart-total tr .cart-total-left .nobr");
  }
  get cartTotalRowPrices(): Locator {
    return this.page.locator(".cart-total tr .product-price");
  }
  get warningTermsOfService(): Locator {
    return this.page.getByRole("dialog").locator("p");
  }
  async clickTermsOfService(): Promise<void> {
    await this.page.locator("span.read").click();
  }
  async closeTermsOfServiceWarning(): Promise<void> {
    await this.page
      .getByRole("dialog")
      .getByRole("button", { name: "close" })
      .click();
  }
  async clickTermsOfServiceCheckBox(): Promise<void> {
    await this.page.locator("#termsofservice").click();
  }
  async clickCheckout(): Promise<void> {
    await this.page.getByRole("button", { name: "Checkout" }).click();
  }
}
