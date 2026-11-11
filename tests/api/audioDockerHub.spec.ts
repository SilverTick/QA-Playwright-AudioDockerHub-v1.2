import { tags } from "../../config/tags";
import { test, expect } from "@playwright/test";
import users from "../../test-data/loginUsers.json";
import {
  getUsersCollection,
  closeMongoClient,
} from "../../utils/mongoDBHelper";
import Ajv from "ajv";
import signupSchema from "../../schemas/signup.schema.json";

test.describe("API - CommonUser02 CRUD", {  tag: [tags.test.api, tags.module.userCRUD], }, () => {
  test.describe.configure({
    mode: "serial",
  });
  const ajv = new Ajv();
  const validateSignupResponse = ajv.compile(signupSchema);
  let token = "";
  let userId = "";

  const commonUser02 = users.commonUser02;
  const newUsername = commonUser02.username + `z`;
  const newPassword = commonUser02.password + `z`;

  test.afterAll(async () => {
    await closeMongoClient();
  });
    test(`API01: Create ${commonUser02.username}`, async ({ request }) => {
    const collection = await getUsersCollection();
    await test.step(`Cleanup test date before testing`, async () => {
      await collection.deleteOne({ username:commonUser02.username });
      await collection.deleteOne({ username:newUsername });
    });
      const startTime = Date.now();
      const response = await request.post("/api/signup", {
        data: {
          username: commonUser02.username,
          password: commonUser02.password,
        },
      });
      const responseTime = Date.now() - startTime;
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      expect(responseTime).toBeLessThan(2000);
      expect(response.headers()["content-type"]).toContain("application/json");
      const body = await response.json();
      const isValid = validateSignupResponse(body);
      expect(
        isValid,
        JSON.stringify(validateSignupResponse.errors, null, 2),
      ).toBe(true);
      expect(body.token).toMatch(
        /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
      );
      console.log(body);
      console.log(JSON.stringify(body, null, 2));
      token = body.token;
      const user = await collection.findOne({
        username: commonUser02.username,
      });
      expect(user).not.toBeNull();
      expect(user?.username).toBe(commonUser02.username);
    });

    test(`API02: Duplicate ${commonUser02.username}`, async ({ request }) => {
      const startTime = Date.now();
      await request.post("/api/signup", {
        data: {
          username: commonUser02.username,
          password: commonUser02.password,
        },
      });
      const response = await request.post("/api/signup", {
        data: {
          username: commonUser02.username,
          password: commonUser02.password,
        },
      });
      const body = await response.json();
      const responseTime = Date.now() - startTime;
      expect(response.status()).toBe(409);
      expect(responseTime).toBeLessThan(2000);
      expect(body).toEqual({
        message: "User already exists",
      });
      console.log(body);
      console.log(JSON.stringify(body, null, 2));
      const collection = await getUsersCollection();
      const userCount = await collection.countDocuments({
        username: commonUser02.username,
      });
      expect(userCount).toBe(1);
    });

    test(`API03: Update username for ${commonUser02.username}`, async ({ request }) => {
      // should not be GET request
      const response = await request.patch(
        `/api/updateusername?oldusername=${commonUser02.username}&newusername=${newUsername}`,
      );
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.message).toContain("success");
      expect(body.token).toBeTruthy();
      console.log(body);
      console.log(JSON.stringify(body, null, 2));
      const collection = await getUsersCollection();
      const updatedUser = await collection.findOne({
        username: newUsername,
      });
      expect(updatedUser).not.toBeNull();
      expect(updatedUser?.username).toBe(newUsername);
    });

    test(`API04: Update password for ${newUsername}`, async ({ request }) => {
      const collection = await getUsersCollection();
      const user = await collection.findOne({
        username: newUsername,
      });
      const passwordEncrypted = user?.password;
      // should not be GET request
      const response = await request.patch(
        `/api/updatepassword?username=${newUsername}&password=${newPassword}`,
      );
      expect(response.status()).toBe(200);
      expect(response.ok()).toBeTruthy();
      const body = await response.json();
      expect(body.message.trim()).toContain("success");
      console.log(body);
      console.log(JSON.stringify(body, null, 2));
      const updatedUser = await collection.findOne({
        username: newUsername,
      });
      expect(updatedUser).not.toBeNull();
      expect(updatedUser!.password).not.toBe(passwordEncrypted);
    });

    test(`API05: Delete user for ${newUsername}`, async ({ request }) => {
        const collection = await getUsersCollection();
        const user = await collection.findOne({
          username: newUsername,
        });
      const response = await request.delete(`/api/deleteaccount/${user?._id}`);
      expect(response.ok()).toBeTruthy();
    });
});
