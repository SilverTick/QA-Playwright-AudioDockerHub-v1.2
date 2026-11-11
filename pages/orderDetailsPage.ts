import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class OrderDetailsPage extends BasePage {
  get orderDetailsPanel(): Locator {
    return this.page.locator(".page.order-details-page");
  }
  get orderNoTxt(): Locator {
    return this.orderDetailsPanel.locator(".order-number strong");
  }
  get orderDetailsBillingAddressName(): Locator {
    return this.page.locator(".billing-info .name");
  }
  get orderDetailsBillingAddressEmail(): Locator {
    return this.page.locator(".billing-info .email");
  }
  get orderDetailsBillingAddressPhone(): Locator {
    return this.page.locator(".billing-info .phone");
  }
  get orderDetailsBillingAddressFax(): Locator {
    return this.page.locator(".billing-info .fax");
  }
  get orderDetailsBillingAddressCompany(): Locator {
    return this.page.locator(".billing-info .company");
  }
  get orderDetailsBillingAddressAddress1(): Locator {
    return this.page.locator(".billing-info .address1");
  }
  get orderDetailsBillingAddressCityStateZip(): Locator {
    return this.page.locator(".billing-info .city-state-zip");
  }
  get orderDetailsBillingAddressCountry(): Locator {
    return this.page.locator(".billing-info .country");
  }
  get orderDetailsPaymentMethod(): Locator {
    return this.orderDetailsPanel.locator(".payment-method");
  }
  get orderDetailsShippingAddressName(): Locator {
    return this.page.locator(".shipping-info .name");
  }
  get orderDetailsShippingAddressEmail(): Locator {
    return this.page.locator(".shipping-info .email");
  }
  get orderDetailsShippingAddressPhone(): Locator {
    return this.page.locator(".shipping-info .phone");
  }
  get orderDetailsShippingAddressFax(): Locator {
    return this.page.locator(".shipping-info .fax");
  }
  get orderDetailsShippingAddressCompany(): Locator {
    return this.page.locator(".shipping-info .company");
  }
  get orderDetailsShippingAddressAddress1(): Locator {
    return this.page.locator(".shipping-info .address1");
  }
  get orderDetailsShippingAddressCityStateZip(): Locator {
    return this.page.locator(".shipping-info .city-state-zip");
  }
  get orderDetailsShippingAddressCountry(): Locator {
    return this.page.locator(".shipping-info .country");
  }
  get orderDetailsShippingMethod(): Locator {
    return this.orderDetailsPanel.locator(".shipping-method");
  }
  selectedCartItem(product: string): Locator {
    return this.page.locator(".section.products tbody tr", {
      hasText: product,
    });
  }
  cartItemRow(productName: string): Locator {
    return this.page.locator(".section.products tbody tr").filter({
      has: this.page.locator(".a-left.name", { hasText: productName }),
    });
  }
  cartItemPrice(itemRow: Locator): Locator {
    return itemRow.locator(".a-right.price");
  }
  cartItemQuantity(itemRow: Locator): Locator {
    return itemRow.locator(".a-center.quantity");
  }
  cartItemSubTotal(itemRow: Locator): Locator {
    return itemRow.locator(".a-right.total");
  }
  get cartTotalRowNames(): Locator {
    return this.page.locator(".cart-total tr .cart-total-left .nobr");
  }
  get cartTotalRowPrices(): Locator {
    return this.page.locator(".cart-total tr .cart-total-right .nobr");
  }
}
