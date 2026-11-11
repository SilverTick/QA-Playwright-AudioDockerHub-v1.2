import { env } from "../config/env";
import { Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class LoginPage extends BasePage {
  async navigateAudioDockerHub(): Promise<void> {
    await this.page.goto(env.baseUrl);
    await this.audioHubHeader.waitFor({
      state: "attached",
      timeout: 20000,
    });
  }
  get audioHubHeader(): Locator {
    return this.page.getByText("Sign In to AudioHub");
  }
  get newSignUpBtn(): Locator {
    return this.page.getByRole("button", { name: "Sign Up" });
  }
  get logInBtn(): Locator {
    return this.page.getByRole("button", { name: "Login" });
  }
  get signUpSuccessTxt(): Locator {
    return this.page.getByText("Sign Up Successed!");
  }
  async navigateToSignUp(): Promise<void> {
    await this.newSignUpBtn.click();
  }
  async signUp(
    username: string,
    password: string,
    cfmPassword: string,
  ): Promise<void> {
    await this.enterUserSignUp(username, password, cfmPassword);
    await this.page.locator(`#confirmPassword[value="${password}"]`).waitFor({
      state: "visible",
      timeout: 20000,
    });
    await this.clickSignUp();
    await this.signUpSuccessTxt.waitFor({
      state: "attached",
      timeout: 20000,
    });
  }
  async enterUserSignUp(
    username: string,
    password: string,
    cfmPassword: string,
  ): Promise<void> {
    await this.page.getByLabel("User Name:", { exact: true }).fill(username);
    await this.page.getByLabel("Password:", { exact: true }).fill(password);
    await this.page
      .getByLabel("Confirm Password:", { exact: true })
      .fill(cfmPassword);
  }
  async clickSignUp(): Promise<void> {
    await this.scrollUntil(this.page.getByRole("button", { name: "Sign Up" }));
    await this.page.getByRole("button", { name: "Sign Up" }).click();
  }
  async login(username: string, password: string): Promise<void> {
    await this.enterUserLogin(username, password);
    await this.page.locator(`#password[value="${password}"]`).waitFor({
      state: "visible",
      timeout: 20000,
    });
    await this.clickLogin();
    await this.page
      .getByRole("heading", { name: "Audio Hub", exact: true })
      .waitFor({
        state: "attached",
        timeout: 20000,
      });
  }
  async enterUserLogin(username: string, password: string): Promise<void> {
    await this.page
      .getByLabel("Username or Email:", { exact: true })
      .fill(username);
    await this.page.getByLabel("Password:", { exact: true }).fill(password);
  }
  async clickLogin(): Promise<void> {
    await this.scrollUntil(this.page.getByRole("button", { name: "Login" }));
    await this.page.getByRole("button", { name: "Login" }).click();
  }
}
