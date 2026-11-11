import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  get billingAddressPanel(): Locator {
    return this.page.locator("#opc-billing");
  }
  get selectedBillingAddress(): Locator {
    return this.page.locator("#billing-address-select option").first();
  }
  get shippingAddressPanel(): Locator {
    return this.page.locator("#opc-shipping");
  }
  get selectedShippingAddress(): Locator {
    return this.page.locator("#shipping-address-select option").first();
  }
  get shippingMethodPanel(): Locator {
    return this.page.locator("#opc-shipping_method");
  }
  selectedShippingMethod(method: string): Locator {
    return this.page
      .locator(".method-name", { hasText: method })
      .getByRole("radio");
  }
  get paymentMethodPanel(): Locator {
    return this.page.locator("#opc-payment_method");
  }
  selectedPaymentMethod(method: string): Locator {
    return this.page
      .locator(".method-name", { hasText: method })
      .getByRole("radio");
  }
  get paymentInformationPanel(): Locator {
    return this.page.locator("#opc-payment_info");
  }
  get paymentInformation(): Locator {
    return this.paymentInformationPanel.locator(".checkout-data p");
  }
  get confirmOrderPanel(): Locator {
    return this.page.locator("#opc-confirm_order");
  }
  get confirmOrderBillingAddressName(): Locator {
    return this.page.locator(".billing-info .name");
  }
  get confirmOrderBillingAddressEmail(): Locator {
    return this.page.locator(".billing-info .email");
  }
  get confirmOrderBillingAddressPhone(): Locator {
    return this.page.locator(".billing-info .phone");
  }
  get confirmOrderBillingAddressFax(): Locator {
    return this.page.locator(".billing-info .fax");
  }
  get confirmOrderBillingAddressCompany(): Locator {
    return this.page.locator(".billing-info .company");
  }
  get confirmOrderBillingAddressAddress1(): Locator {
    return this.page.locator(".billing-info .address1");
  }
  get confirmOrderBillingAddressCityStateZip(): Locator {
    return this.page.locator(".billing-info .city-state-zip");
  }
  get confirmOrderBillingAddressCountry(): Locator {
    return this.page.locator(".billing-info .country");
  }
  get confirmOrderPaymentMethod(): Locator {
    return this.confirmOrderPanel.locator(".payment-method");
  }
  get confirmOrderShippingAddressName(): Locator {
    return this.page.locator(".shipping-info .name");
  }
  get confirmOrderShippingAddressEmail(): Locator {
    return this.page.locator(".shipping-info .email");
  }
  get confirmOrderShippingAddressPhone(): Locator {
    return this.page.locator(".shipping-info .phone");
  }
  get confirmOrderShippingAddressFax(): Locator {
    return this.page.locator(".shipping-info .fax");
  }
  get confirmOrderShippingAddressCompany(): Locator {
    return this.page.locator(".shipping-info .company");
  }
  get confirmOrderShippingAddressAddress1(): Locator {
    return this.page.locator(".shipping-info .address1");
  }
  get confirmOrderShippingAddressCityStateZip(): Locator {
    return this.page.locator(".shipping-info .city-state-zip");
  }
  get confirmOrderShippingAddressCountry(): Locator {
    return this.page.locator(".shipping-info .country");
  }
  get confirmOrderShippingMethod(): Locator {
    return this.confirmOrderPanel.locator(".shipping-method");
  }
  selectedCartItem(product: string): Locator {
    return this.page.locator(".cart-item-row .product", { hasText: product });
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
    return itemRow.locator(".qty.nobr span").last();
  }
  cartItemSubTotal(itemRow: Locator): Locator {
    return itemRow.locator(".product-subtotal");
  }
  get cartTotalRowNames(): Locator {
    return this.page.locator(".cart-total tr .cart-total-left .nobr");
  }
  get cartTotalRowPrices(): Locator {
    return this.page.locator(".cart-total tr .cart-total-right .nobr");
  }
  get orderCompletedTxt(): Locator {
    return this.page.locator(".section.order-completed strong");
  }
  get orderNoTxt(): Locator {
    return this.page.locator(".section.order-completed li").first();
  }
  get orderNoURL(): Locator {
    return this.page.locator(".section.order-completed a");
  }
  async clickContinueToShippingAddress(): Promise<void> {
    await this.billingAddressPanel
      .getByRole("button", { name: "Continue" })
      .click();
  }
  async clickContinueToShippingMethod(): Promise<void> {
    await this.shippingAddressPanel
      .getByRole("button", { name: "Continue" })
      .click();
  }
  async clickContinueToPaymentMethod(): Promise<void> {
    await this.shippingMethodPanel
      .getByRole("button", { name: "Continue" })
      .click();
  }
  async clickContinueToPaymentInformation(): Promise<void> {
    await this.paymentMethodPanel
      .getByRole("button", { name: "Continue" })
      .click();
  }
  async clickContinueToConfirmOrder(): Promise<void> {
    await this.paymentInformationPanel
      .getByRole("button", { name: "Continue" })
      .click();
  }
  async clickConfirmOrder(): Promise<void> {
    await this.confirmOrderPanel
      .getByRole("button", { name: "Confirm" })
      .click();
  }
  async navigateToOrderDetails(): Promise<void> {
    await this.orderNoURL.click();
  }
}
