import { tags } from "../../config/tags";
import { Page } from "@playwright/test";
import { test, expect } from "../../fixtures/uiPageFixtures";
import { testStepWithScreenshot } from "../../utils/stepHelper";
import users from "../../test-data/loginUsers.json";
import textLists from "../../test-data/textLists.json";
import checkouts from "../../test-data/checkoutData.json";
let orderNo = "";
test.beforeEach(async ({ loginPage }) => {
  orderNo = "";
  await test.step(`Navigate to AudioDockerHub`, async () => {
    await loginPage.navigateAudioDockerHub();
  });
});
test("TC01 - AudioDockerHub - CommonUser Login", {  tag: [tags.test.ui, tags.module.audioHubE2E], }, async ({
  homePage,
  loginPage,
  searchPage,
  cartPage,
  checkoutPage,
  orderDetailsPage,
}) => {
  let newPage: Page;
  const commonUser01 = users.commonUser01;
  const {
    searchInput,
    productItem1,
    productItem1Price,
    productItem1Quantity,
    shippingMethod,
    shippingMethodFee,
    paymentMethod,
    paymentMethodFee,
    paymentInformation,
    taxFee,
  } = checkouts.smartPhoneCashOnDelivery;
  const productItem1SubTotal = String(
    Number(productItem1Price) * Number(productItem1Quantity),
  );
  const cartTotal = String(
    Number(productItem1SubTotal) +
      Number(shippingMethodFee) +
      Number(paymentMethodFee) +
      Number(taxFee),
  );
  await testStepWithScreenshot(
    `Workflow - Login as CommonUser`,
    loginPage.getPage,
    async () => {
      await testStepWithScreenshot(
        `Validate - Sign Up button and Login button`,
        loginPage.getPage,
        async () => {
          await expect(loginPage.newSignUpBtn).toBeVisible();
          await expect(loginPage.logInBtn).toBeVisible();
        },
      );
      await test.step(`Action - Sign Up with CommonUser01 - ${commonUser01.username}`, async () => {
        await loginPage.navigateToSignUp();
        await loginPage.signUp(
          commonUser01.username,
          commonUser01.password,
          commonUser01.cfmPassword,
        );
      });
      await testStepWithScreenshot(
        `Validate - Sign Up Successed!`,
        loginPage.getPage,
        async () => {
          await expect(loginPage.signUpSuccessTxt).toBeVisible();
        },
      );
      await test.step(`Action - Login with CommonUser01 - ${commonUser01.username}`, async () => {
        await loginPage.login(commonUser01.username, commonUser01.password);
      });
      await testStepWithScreenshot(
        `Validate - Displayed username in homepage`,
        homePage.getPage,
        async () => {
          await expect(homePage.usernameTxt).toHaveText(commonUser01.username);
        },
      );
    },
  );
  // await testStepWithScreenshot(
  //   `Workflow - Product Search using search bar - ${searchInput}`,
  //   searchPage.getPage,
  //   async () => {
  //     await test.step(`Action - Enter search bar and product search for ${searchInput}`, async () => {
  //       await searchPage.enterProductSearch(searchInput);
  //       await searchPage.searchInputValue(searchInput).waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //       await searchPage.searchResults.waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //       await searchPage.selectedProduct(searchInput).waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Search input and Displayed product(s) in search results - ${searchInput}`,
  //       searchPage.getPage,
  //       async () => {
  //         await expect(searchPage.searchInput).toHaveValue(searchInput);
  //         await expect(searchPage.selectedProduct(searchInput)).toBeVisible();
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Add to Cart - ${productItem1}`,
  //   cartPage.getPage,
  //   async () => {
  //     await test.step(`Action - Add to Cart - ${productItem1}`, async () => {
  //       await searchPage.addSelectedProductToCart(productItem1);
  //       await searchPage.notificationContent.waitFor({
  //         state: "visible",
  //         timeout: 20000,
  //       });
  //       await searchPage.navBarShoppingCartBtn.hover();
  //       await searchPage.navBarMiniShoppingCart.waitFor({
  //         state: "visible",
  //         timeout: 20000,
  //       });
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Notification and product added in Mini Shopping Cart`,
  //       searchPage.getPage,
  //       async () => {
  //         await expect(searchPage.notificationContent).toHaveText(
  //           textLists.notification.productAddedShoppingCart,
  //         );
  //         await searchPage.navBarShoppingCartBtn.hover();
  //         await expect(
  //           searchPage.selectedMiniCartItem(productItem1),
  //         ).toBeVisible();
  //         const item1Row = searchPage.miniCartItemRow(productItem1);
  //         await expect(searchPage.miniCartItemPrice(item1Row)).toHaveText(
  //           `${productItem1Price}.00`,
  //         );
  //         await expect(searchPage.miniCartItemQuantity(item1Row)).toHaveText(
  //           productItem1Quantity,
  //         );
  //         await expect(searchPage.miniCartTotal).toHaveText(
  //           `${productItem1SubTotal}.00`,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Navigate to Cart`, async () => {
  //       await cartPage.clickShoppingCart();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed item(s) in cart and Cart Total- ${productItem1}`,
  //       cartPage.getPage,
  //       async () => {
  //         await expect(cartPage.carts).toBeVisible();
  //         await expect(cartPage.selectedCartItem(productItem1)).toBeVisible();
  //         const item1Row = cartPage.cartItemRow(productItem1);
  //         await expect(cartPage.cartItemPrice(item1Row)).toHaveText(
  //           `${productItem1Price}.00`,
  //         );
  //         await expect(cartPage.cartItemQuantity(item1Row)).toHaveValue(
  //           productItem1Quantity,
  //         );
  //         await expect(cartPage.cartItemSubTotal(item1Row)).toHaveText(
  //           `${productItem1SubTotal}.00`,
  //         );
  //         await expect(checkoutPage.cartTotalRowNames).toContainText([
  //           textLists.cartTotal.subTotal,
  //           textLists.cartTotal.shippingMethodFee,
  //           textLists.cartTotal.taxFee,
  //           textLists.cartTotal.total,
  //         ]);
  //         await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //           `${productItem1SubTotal}.00`,
  //           `${shippingMethodFee}.00`,
  //           `${taxFee}.00`,
  //           `${productItem1SubTotal}.00`,
  //         ]);
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Checkout process and Payment execution`,
  //   checkoutPage.getPage,
  //   async () => {
  //     await testStepWithScreenshot(
  //       `Validate - Terms of Service warning text before Checkout`,
  //       cartPage.getPage,
  //       async () => {
  //         await cartPage.clickCheckout();
  //         await expect(cartPage.warningTermsOfService).toHaveText(
  //           textLists.termsOfService.warning,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click to read Terms of Service`, async () => {
  //       [newPage] = await Promise.all([
  //         cartPage.getPage.waitForEvent("popup"),
  //         cartPage.clickTermsOfService(),
  //       ]);
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Terms of Service`,
  //       newPage,
  //       async () => {
  //         await expect(newPage.locator(".page-title h1")).toHaveText(
  //           textLists.termsOfService.title,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Perform Checkout`, async () => {
  //       await newPage.close();
  //       await cartPage.closeTermsOfServiceWarning();
  //       await cartPage.clickTermsOfServiceCheckBox();
  //       await cartPage.clickCheckout();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Billing Address`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.billingAddressPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.selectedBillingAddress).toHaveText(
  //           commonUser01.checkoutAddress,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Shipping Address`, async () => {
  //       await checkoutPage.clickContinueToShippingAddress();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Shipping Address`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.shippingAddressPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.selectedShippingAddress).toHaveText(
  //           commonUser01.checkoutAddress,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Shipping Method`, async () => {
  //       await checkoutPage.clickContinueToShippingMethod();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Shipping Method`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.shippingMethodPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(
  //           checkoutPage.selectedShippingMethod(
  //             `${shippingMethod} (${shippingMethodFee}.00)`,
  //           ),
  //         ).toBeChecked;
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Payment Method`, async () => {
  //       await checkoutPage.clickContinueToPaymentMethod();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Payment Method`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.paymentMethodPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(
  //           checkoutPage.selectedPaymentMethod(
  //             `${paymentMethod} (${paymentMethodFee}.00)`,
  //           ),
  //         ).toBeChecked;
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Payment Information`, async () => {
  //       await checkoutPage.clickContinueToPaymentInformation();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Payment Information`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.paymentInformationPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.paymentInformation).toHaveText(
  //           paymentInformation,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Confirm Order`, async () => {
  //       await checkoutPage.clickContinueToConfirmOrder();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Confirm Order`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await test.step(`Validate - Billing Address`, async () => {
  //           await expect(checkoutPage.confirmOrderPanel).toHaveAttribute(
  //             "class",
  //             "tab-section allow active",
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(checkoutPage.confirmOrderBillingAddressFax).toHaveText(
  //             `Fax: ${commonUser01.faxNumber}`,
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Payment Method`, async () => {
  //           await expect(checkoutPage.confirmOrderPaymentMethod).toHaveText(
  //             paymentMethod,
  //           );
  //         });
  //         await test.step(`Validate - Shipping Address`, async () => {
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Shipping Method`, async () => {
  //           await expect(checkoutPage.confirmOrderShippingMethod).toHaveText(
  //             shippingMethod,
  //           );
  //         });
  //         await test.step(`Validate - Cart`, async () => {
  //           await expect(
  //             checkoutPage.selectedCartItem(productItem1),
  //           ).toBeVisible();
  //           const item1Row = checkoutPage.cartItemRow(productItem1);
  //           await expect(checkoutPage.cartItemPrice(item1Row)).toHaveText(
  //             `${productItem1Price}.00`,
  //           );
  //           await expect(checkoutPage.cartItemQuantity(item1Row)).toHaveText(
  //             productItem1Quantity,
  //           );
  //           await expect(checkoutPage.cartItemSubTotal(item1Row)).toHaveText(
  //             `${productItem1SubTotal}.00`,
  //           );
  //         });
  //         await test.step(`Validate - Order Total`, async () => {
  //           await expect(checkoutPage.cartTotalRowNames).toContainText([
  //             textLists.cartTotal.subTotal,
  //             textLists.cartTotal.shippingMethodFee,
  //             textLists.cartTotal.paymentMethodFee,
  //             textLists.cartTotal.taxFee,
  //             textLists.cartTotal.total,
  //           ]);
  //           await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //             `${productItem1SubTotal}.00`,
  //             `${shippingMethodFee}.00`,
  //             `${paymentMethodFee}.00`,
  //             `${taxFee}.00`,
  //             `${cartTotal}.00`,
  //           ]);
  //         });
  //       },
  //     );
  //     await test.step(`Action - Click confirm to complete Order`, async () => {
  //       await checkoutPage.clickConfirmOrder();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Order Completed Details`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.orderCompletedTxt).toHaveText(
  //           textLists.completedOrder.title,
  //         );
  //         await expect(checkoutPage.orderNoTxt).toHaveText(
  //           new RegExp(`^\\s*${textLists.completedOrder.orderNo}\\d{7}\\s*$`),
  //         );
  //         await expect(checkoutPage.orderNoURL).toHaveText(
  //           textLists.completedOrder.orderNoURL,
  //         );
  //         orderNo =
  //           (await checkoutPage.orderNoTxt.textContent())
  //             ?.replace(textLists.completedOrder.orderNo, "")
  //             .trim() ?? "";
  //         expect(orderNo).toBeTruthy();
  //         await expect(checkoutPage.orderNoURL).toHaveAttribute(
  //           "href",
  //           expect.stringContaining(orderNo),
  //         );
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Order #${orderNo} Details`,
  //   orderDetailsPage.getPage,
  //   async () => {
  //     await test.step(`Action - Navigate to Order #${orderNo} Details`, async () => {
  //       await checkoutPage.navigateToOrderDetails();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Order #${orderNo} Details`,
  //       orderDetailsPage.getPage,
  //       async () => {
  //         await test.step(`Validate - Billing Address`, async () => {
  //           await expect(orderDetailsPage.orderDetailsPanel).toBeVisible();
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Payment Method`, async () => {
  //           await expect(orderDetailsPage.orderDetailsPaymentMethod).toHaveText(
  //             paymentMethod,
  //           );
  //         });
  //         await test.step(`Validate - Shipping Address`, async () => {
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Shipping Method`, async () => {
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingMethod,
  //           ).toHaveText(shippingMethod);
  //         });
  //         await test.step(`Validate - Cart`, async () => {
  //           await expect(
  //             orderDetailsPage.selectedCartItem(productItem1),
  //           ).toBeVisible();
  //           const item1Row = orderDetailsPage.cartItemRow(productItem1);
  //           await expect(orderDetailsPage.cartItemPrice(item1Row)).toHaveText(
  //             new RegExp(`Price:\\s*${productItem1Price}.00`),
  //           );
  //           await expect(
  //             orderDetailsPage.cartItemQuantity(item1Row),
  //           ).toHaveText(new RegExp(`Quantity:\\s*${productItem1Quantity}`));
  //           await expect(
  //             orderDetailsPage.cartItemSubTotal(item1Row),
  //           ).toHaveText(new RegExp(`Total:\\s*${productItem1SubTotal}.00`));
  //         });
  //         await test.step(`Validate - Order Total`, async () => {
  //           await expect(checkoutPage.cartTotalRowNames).toContainText([
  //             textLists.cartTotal.subTotal,
  //             textLists.cartTotal.shippingMethodFee,
  //             textLists.cartTotal.paymentMethodFee,
  //             textLists.cartTotal.taxFee,
  //             textLists.cartTotal.orderTotal,
  //           ]);
  //           await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //             `${productItem1SubTotal}.00`,
  //             `${shippingMethodFee}.00`,
  //             `${paymentMethodFee}.00`,
  //             `${taxFee}.00`,
  //             `${cartTotal}.00`,
  //           ]);
  //         });
  //       },
  //     );
  //   },
  // );
});
test("TC02 - AudioDockerHub - AdminUser Login", {  tag: [tags.test.ui, tags.module.audioHubE2E], }, async ({
  homePage,
  loginPage,
  searchPage,
  cartPage,
  checkoutPage,
  orderDetailsPage,
}) => {
  let newPage: Page;
  const adminUser01 = users.adminUser01;
  const {
    searchInput,
    productItem1,
    productItem1Price,
    productItem1Quantity,
    shippingMethod,
    shippingMethodFee,
    paymentMethod,
    paymentMethodFee,
    paymentInformation,
    taxFee,
  } = checkouts.smartPhoneCashOnDelivery;
  const productItem1SubTotal = String(
    Number(productItem1Price) * Number(productItem1Quantity),
  );
  const cartTotal = String(
    Number(productItem1SubTotal) +
      Number(shippingMethodFee) +
      Number(paymentMethodFee) +
      Number(taxFee),
  );
  await testStepWithScreenshot(
    `Workflow - Login as AdminUser`,
    loginPage.getPage,
    async () => {
      await testStepWithScreenshot(
        `Validate - Sign Up button and Login button`,
        loginPage.getPage,
        async () => {
          await expect(loginPage.newSignUpBtn).toBeVisible();
          await expect(loginPage.logInBtn).toBeVisible();
        },
      );
      await test.step(`Action - Sign Up with AdminUser01 - ${adminUser01.username}`, async () => {
        await loginPage.navigateToSignUp();
        await loginPage.signUp(
          adminUser01.username,
          adminUser01.password,
          adminUser01.cfmPassword,
        );
      });
      await testStepWithScreenshot(
        `Validate - Sign Up Successed!`,
        loginPage.getPage,
        async () => {
          await expect(loginPage.signUpSuccessTxt).toBeVisible();
        },
      );
      await test.step(`Action - Login with AdminUser01 - ${adminUser01.username}`, async () => {
        await loginPage.login(adminUser01.username, adminUser01.password);
      });
      await testStepWithScreenshot(
        `Validate - Displayed username in homepage`,
        homePage.getPage,
        async () => {
          await expect(homePage.usernameTxt).toHaveText(adminUser01.username);
        },
      );
    },
  );
  // await testStepWithScreenshot(
  //   `Workflow - Product Search using search bar - ${searchInput}`,
  //   searchPage.getPage,
  //   async () => {
  //     await test.step(`Action - Enter search bar and product search for ${searchInput}`, async () => {
  //       await searchPage.enterProductSearch(searchInput);
  //       await searchPage.searchInputValue(searchInput).waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //       await searchPage.searchResults.waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //       await searchPage.selectedProduct(searchInput).waitFor({
  //         state: "attached",
  //         timeout: 20000,
  //       });
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Search input and Displayed product(s) in search results - ${searchInput}`,
  //       searchPage.getPage,
  //       async () => {
  //         await expect(searchPage.searchInput).toHaveValue(searchInput);
  //         await expect(searchPage.selectedProduct(searchInput)).toBeVisible();
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Add to Cart - ${productItem1}`,
  //   cartPage.getPage,
  //   async () => {
  //     await test.step(`Action - Add to Cart - ${productItem1}`, async () => {
  //       await searchPage.addSelectedProductToCart(productItem1);
  //       await searchPage.notificationContent.waitFor({
  //         state: "visible",
  //         timeout: 20000,
  //       });
  //       await searchPage.navBarShoppingCartBtn.hover();
  //       await searchPage.navBarMiniShoppingCart.waitFor({
  //         state: "visible",
  //         timeout: 20000,
  //       });
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Notification and product added in Mini Shopping Cart`,
  //       searchPage.getPage,
  //       async () => {
  //         await expect(searchPage.notificationContent).toHaveText(
  //           textLists.notification.productAddedShoppingCart,
  //         );
  //         await searchPage.navBarShoppingCartBtn.hover();
  //         await expect(
  //           searchPage.selectedMiniCartItem(productItem1),
  //         ).toBeVisible();
  //         const item1Row = searchPage.miniCartItemRow(productItem1);
  //         await expect(searchPage.miniCartItemPrice(item1Row)).toHaveText(
  //           `${productItem1Price}.00`,
  //         );
  //         await expect(searchPage.miniCartItemQuantity(item1Row)).toHaveText(
  //           productItem1Quantity,
  //         );
  //         await expect(searchPage.miniCartTotal).toHaveText(
  //           `${productItem1SubTotal}.00`,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Navigate to Cart`, async () => {
  //       await cartPage.clickShoppingCart();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed item(s) in cart and Cart Total- ${productItem1}`,
  //       cartPage.getPage,
  //       async () => {
  //         await expect(cartPage.carts).toBeVisible();
  //         await expect(cartPage.selectedCartItem(productItem1)).toBeVisible();
  //         const item1Row = cartPage.cartItemRow(productItem1);
  //         await expect(cartPage.cartItemPrice(item1Row)).toHaveText(
  //           `${productItem1Price}.00`,
  //         );
  //         await expect(cartPage.cartItemQuantity(item1Row)).toHaveValue(
  //           productItem1Quantity,
  //         );
  //         await expect(cartPage.cartItemSubTotal(item1Row)).toHaveText(
  //           `${productItem1SubTotal}.00`,
  //         );
  //         await expect(checkoutPage.cartTotalRowNames).toContainText([
  //           textLists.cartTotal.subTotal,
  //           textLists.cartTotal.shippingMethodFee,
  //           textLists.cartTotal.taxFee,
  //           textLists.cartTotal.total,
  //         ]);
  //         await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //           `${productItem1SubTotal}.00`,
  //           `${shippingMethodFee}.00`,
  //           `${taxFee}.00`,
  //           `${productItem1SubTotal}.00`,
  //         ]);
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Checkout process and Payment execution`,
  //   checkoutPage.getPage,
  //   async () => {
  //     await testStepWithScreenshot(
  //       `Validate - Terms of Service warning text before Checkout`,
  //       cartPage.getPage,
  //       async () => {
  //         await cartPage.clickCheckout();
  //         await expect(cartPage.warningTermsOfService).toHaveText(
  //           textLists.termsOfService.warning,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click to read Terms of Service`, async () => {
  //       [newPage] = await Promise.all([
  //         cartPage.getPage.waitForEvent("popup"),
  //         cartPage.clickTermsOfService(),
  //       ]);
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Terms of Service`,
  //       newPage,
  //       async () => {
  //         await expect(newPage.locator(".page-title h1")).toHaveText(
  //           textLists.termsOfService.title,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Perform Checkout`, async () => {
  //       await newPage.close();
  //       await cartPage.closeTermsOfServiceWarning();
  //       await cartPage.clickTermsOfServiceCheckBox();
  //       await cartPage.clickCheckout();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Billing Address`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.billingAddressPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.selectedBillingAddress).toHaveText(
  //           commonUser01.checkoutAddress,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Shipping Address`, async () => {
  //       await checkoutPage.clickContinueToShippingAddress();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Shipping Address`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.shippingAddressPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.selectedShippingAddress).toHaveText(
  //           commonUser01.checkoutAddress,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Shipping Method`, async () => {
  //       await checkoutPage.clickContinueToShippingMethod();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Shipping Method`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.shippingMethodPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(
  //           checkoutPage.selectedShippingMethod(
  //             `${shippingMethod} (${shippingMethodFee}.00)`,
  //           ),
  //         ).toBeChecked;
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Payment Method`, async () => {
  //       await checkoutPage.clickContinueToPaymentMethod();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Selected Payment Method`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.paymentMethodPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(
  //           checkoutPage.selectedPaymentMethod(
  //             `${paymentMethod} (${paymentMethodFee}.00)`,
  //           ),
  //         ).toBeChecked;
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Payment Information`, async () => {
  //       await checkoutPage.clickContinueToPaymentInformation();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Payment Information`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.paymentInformationPanel).toHaveAttribute(
  //           "class",
  //           "tab-section allow active",
  //         );
  //         await expect(checkoutPage.paymentInformation).toHaveText(
  //           paymentInformation,
  //         );
  //       },
  //     );
  //     await test.step(`Action - Click continue to navigate to Confirm Order`, async () => {
  //       await checkoutPage.clickContinueToConfirmOrder();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Confirm Order`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await test.step(`Validate - Billing Address`, async () => {
  //           await expect(checkoutPage.confirmOrderPanel).toHaveAttribute(
  //             "class",
  //             "tab-section allow active",
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(checkoutPage.confirmOrderBillingAddressFax).toHaveText(
  //             `Fax: ${commonUser01.faxNumber}`,
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Payment Method`, async () => {
  //           await expect(checkoutPage.confirmOrderPaymentMethod).toHaveText(
  //             paymentMethod,
  //           );
  //         });
  //         await test.step(`Validate - Shipping Address`, async () => {
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             checkoutPage.confirmOrderBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             checkoutPage.confirmOrderShippingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Shipping Method`, async () => {
  //           await expect(checkoutPage.confirmOrderShippingMethod).toHaveText(
  //             shippingMethod,
  //           );
  //         });
  //         await test.step(`Validate - Cart`, async () => {
  //           await expect(
  //             checkoutPage.selectedCartItem(productItem1),
  //           ).toBeVisible();
  //           const item1Row = checkoutPage.cartItemRow(productItem1);
  //           await expect(checkoutPage.cartItemPrice(item1Row)).toHaveText(
  //             `${productItem1Price}.00`,
  //           );
  //           await expect(checkoutPage.cartItemQuantity(item1Row)).toHaveText(
  //             productItem1Quantity,
  //           );
  //           await expect(checkoutPage.cartItemSubTotal(item1Row)).toHaveText(
  //             `${productItem1SubTotal}.00`,
  //           );
  //         });
  //         await test.step(`Validate - Order Total`, async () => {
  //           await expect(checkoutPage.cartTotalRowNames).toContainText([
  //             textLists.cartTotal.subTotal,
  //             textLists.cartTotal.shippingMethodFee,
  //             textLists.cartTotal.paymentMethodFee,
  //             textLists.cartTotal.taxFee,
  //             textLists.cartTotal.total,
  //           ]);
  //           await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //             `${productItem1SubTotal}.00`,
  //             `${shippingMethodFee}.00`,
  //             `${paymentMethodFee}.00`,
  //             `${taxFee}.00`,
  //             `${cartTotal}.00`,
  //           ]);
  //         });
  //       },
  //     );
  //     await test.step(`Action - Click confirm to complete Order`, async () => {
  //       await checkoutPage.clickConfirmOrder();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Displayed Order Completed Details`,
  //       checkoutPage.getPage,
  //       async () => {
  //         await expect(checkoutPage.orderCompletedTxt).toHaveText(
  //           textLists.completedOrder.title,
  //         );
  //         await expect(checkoutPage.orderNoTxt).toHaveText(
  //           new RegExp(`^\\s*${textLists.completedOrder.orderNo}\\d{7}\\s*$`),
  //         );
  //         await expect(checkoutPage.orderNoURL).toHaveText(
  //           textLists.completedOrder.orderNoURL,
  //         );
  //         orderNo =
  //           (await checkoutPage.orderNoTxt.textContent())
  //             ?.replace(textLists.completedOrder.orderNo, "")
  //             .trim() ?? "";
  //         expect(orderNo).toBeTruthy();
  //         await expect(checkoutPage.orderNoURL).toHaveAttribute(
  //           "href",
  //           expect.stringContaining(orderNo),
  //         );
  //       },
  //     );
  //   },
  // );
  // await testStepWithScreenshot(
  //   `Workflow - Order #${orderNo} Details`,
  //   orderDetailsPage.getPage,
  //   async () => {
  //     await test.step(`Action - Navigate to Order #${orderNo} Details`, async () => {
  //       await checkoutPage.navigateToOrderDetails();
  //     });
  //     await testStepWithScreenshot(
  //       `Validate - Order #${orderNo} Details`,
  //       orderDetailsPage.getPage,
  //       async () => {
  //         await test.step(`Validate - Billing Address`, async () => {
  //           await expect(orderDetailsPage.orderDetailsPanel).toBeVisible();
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Payment Method`, async () => {
  //           await expect(orderDetailsPage.orderDetailsPaymentMethod).toHaveText(
  //             paymentMethod,
  //           );
  //         });
  //         await test.step(`Validate - Shipping Address`, async () => {
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressName,
  //           ).toHaveText(`${commonUser01.firstName} ${commonUser01.lastName}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressEmail,
  //           ).toHaveText(`Email: ${commonUser01.email}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressPhone,
  //           ).toHaveText(`Phone: ${commonUser01.phoneNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressFax,
  //           ).toHaveText(`Fax: ${commonUser01.faxNumber}`);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressCompany,
  //           ).toHaveText(commonUser01.company);
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressAddress1,
  //           ).toHaveText(commonUser01.address1);
  //           await expect(
  //             orderDetailsPage.orderDetailsBillingAddressCityStateZip,
  //           ).toHaveText(
  //             new RegExp(
  //               `${commonUser01.city}\\s*,\\s*${commonUser01.stateProvince.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s+${commonUser01.zipPostalCode}`,
  //             ),
  //           );
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingAddressCountry,
  //           ).toHaveText(commonUser01.country);
  //         });
  //         await test.step(`Validate - Shipping Method`, async () => {
  //           await expect(
  //             orderDetailsPage.orderDetailsShippingMethod,
  //           ).toHaveText(shippingMethod);
  //         });
  //         await test.step(`Validate - Cart`, async () => {
  //           await expect(
  //             orderDetailsPage.selectedCartItem(productItem1),
  //           ).toBeVisible();
  //           const item1Row = orderDetailsPage.cartItemRow(productItem1);
  //           await expect(orderDetailsPage.cartItemPrice(item1Row)).toHaveText(
  //             new RegExp(`Price:\\s*${productItem1Price}.00`),
  //           );
  //           await expect(
  //             orderDetailsPage.cartItemQuantity(item1Row),
  //           ).toHaveText(new RegExp(`Quantity:\\s*${productItem1Quantity}`));
  //           await expect(
  //             orderDetailsPage.cartItemSubTotal(item1Row),
  //           ).toHaveText(new RegExp(`Total:\\s*${productItem1SubTotal}.00`));
  //         });
  //         await test.step(`Validate - Order Total`, async () => {
  //           await expect(checkoutPage.cartTotalRowNames).toContainText([
  //             textLists.cartTotal.subTotal,
  //             textLists.cartTotal.shippingMethodFee,
  //             textLists.cartTotal.paymentMethodFee,
  //             textLists.cartTotal.taxFee,
  //             textLists.cartTotal.orderTotal,
  //           ]);
  //           await expect(checkoutPage.cartTotalRowPrices).toHaveText([
  //             `${productItem1SubTotal}.00`,
  //             `${shippingMethodFee}.00`,
  //             `${paymentMethodFee}.00`,
  //             `${taxFee}.00`,
  //             `${cartTotal}.00`,
  //           ]);
  //         });
  //       },
  //     );
  //   },
  // );
});
