# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api/audioDockerHub.spec.ts >> API - CommonUser02 CRUD >> API01: Create simsim_api
- Location: tests/api/audioDockerHub.spec.ts:27:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 201
Received: 500
```

# Test source

```ts
  1   | import { tags } from "../../config/tags";
  2   | import { test, expect } from "@playwright/test";
  3   | import users from "../../test-data/loginUsers.json";
  4   | import {
  5   |   getUsersCollection,
  6   |   closeMongoClient,
  7   | } from "../../utils/mongoDBHelper";
  8   | import Ajv from "ajv";
  9   | import signupSchema from "../../schemas/signup.schema.json";
  10  | 
  11  | test.describe("API - CommonUser02 CRUD", {  tag: [tags.test.api, tags.module.userCRUD], }, () => {
  12  |   test.describe.configure({
  13  |     mode: "serial",
  14  |   });
  15  |   const ajv = new Ajv();
  16  |   const validateSignupResponse = ajv.compile(signupSchema);
  17  |   let token = "";
  18  |   let userId = "";
  19  | 
  20  |   const commonUser02 = users.commonUser02;
  21  |   const newUsername = commonUser02.username + `z`;
  22  |   const newPassword = commonUser02.password + `z`;
  23  | 
  24  |   test.afterAll(async () => {
  25  |     await closeMongoClient();
  26  |   });
  27  |     test(`API01: Create ${commonUser02.username}`, async ({ request }) => {
  28  |     const collection = await getUsersCollection();
  29  |     await test.step(`Cleanup test date before testing`, async () => {
  30  |       await collection.deleteOne({ username:commonUser02.username });
  31  |       await collection.deleteOne({ username:newUsername });
  32  |     });
  33  |       const startTime = Date.now();
  34  |       const response = await request.post("/api/signup", {
  35  |         data: {
  36  |           username: commonUser02.username,
  37  |           password: commonUser02.password,
  38  |         },
  39  |       });
  40  |       const responseTime = Date.now() - startTime;
> 41  |       expect(response.status()).toBe(201);
      |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  42  |       expect(response.ok()).toBeTruthy();
  43  |       expect(responseTime).toBeLessThan(2000);
  44  |       expect(response.headers()["content-type"]).toContain("application/json");
  45  |       const body = await response.json();
  46  |       const isValid = validateSignupResponse(body);
  47  |       expect(
  48  |         isValid,
  49  |         JSON.stringify(validateSignupResponse.errors, null, 2),
  50  |       ).toBe(true);
  51  |       expect(body.token).toMatch(
  52  |         /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
  53  |       );
  54  |       console.log(body);
  55  |       console.log(JSON.stringify(body, null, 2));
  56  |       token = body.token;
  57  |       const user = await collection.findOne({
  58  |         username: commonUser02.username,
  59  |       });
  60  |       expect(user).not.toBeNull();
  61  |       expect(user?.username).toBe(commonUser02.username);
  62  |     });
  63  | 
  64  |     test(`API02: Duplicate ${commonUser02.username}`, async ({ request }) => {
  65  |       const startTime = Date.now();
  66  |       await request.post("/api/signup", {
  67  |         data: {
  68  |           username: commonUser02.username,
  69  |           password: commonUser02.password,
  70  |         },
  71  |       });
  72  |       const response = await request.post("/api/signup", {
  73  |         data: {
  74  |           username: commonUser02.username,
  75  |           password: commonUser02.password,
  76  |         },
  77  |       });
  78  |       const body = await response.json();
  79  |       const responseTime = Date.now() - startTime;
  80  |       expect(response.status()).toBe(409);
  81  |       expect(responseTime).toBeLessThan(2000);
  82  |       expect(body).toEqual({
  83  |         message: "User already exists",
  84  |       });
  85  |       console.log(body);
  86  |       console.log(JSON.stringify(body, null, 2));
  87  |       const collection = await getUsersCollection();
  88  |       const userCount = await collection.countDocuments({
  89  |         username: commonUser02.username,
  90  |       });
  91  |       expect(userCount).toBe(1);
  92  |     });
  93  | 
  94  |     test(`API03: Update username for ${commonUser02.username}`, async ({ request }) => {
  95  |       // should not be GET request
  96  |       const response = await request.patch(
  97  |         `/api/updateusername?oldusername=${commonUser02.username}&newusername=${newUsername}`,
  98  |       );
  99  |       expect(response.status()).toBe(200);
  100 |       expect(response.ok()).toBeTruthy();
  101 |       const body = await response.json();
  102 |       expect(body.message).toContain("success");
  103 |       expect(body.token).toBeTruthy();
  104 |       console.log(body);
  105 |       console.log(JSON.stringify(body, null, 2));
  106 |       const collection = await getUsersCollection();
  107 |       const updatedUser = await collection.findOne({
  108 |         username: newUsername,
  109 |       });
  110 |       expect(updatedUser).not.toBeNull();
  111 |       expect(updatedUser?.username).toBe(newUsername);
  112 |     });
  113 | 
  114 |     test(`API04: Update password for ${newUsername}`, async ({ request }) => {
  115 |       const collection = await getUsersCollection();
  116 |       const user = await collection.findOne({
  117 |         username: newUsername,
  118 |       });
  119 |       const passwordEncrypted = user?.password;
  120 |       // should not be GET request
  121 |       const response = await request.patch(
  122 |         `/api/updatepassword?username=${newUsername}&password=${newPassword}`,
  123 |       );
  124 |       expect(response.status()).toBe(200);
  125 |       expect(response.ok()).toBeTruthy();
  126 |       const body = await response.json();
  127 |       expect(body.message.trim()).toContain("success");
  128 |       console.log(body);
  129 |       console.log(JSON.stringify(body, null, 2));
  130 |       const updatedUser = await collection.findOne({
  131 |         username: newUsername,
  132 |       });
  133 |       expect(updatedUser).not.toBeNull();
  134 |       expect(updatedUser!.password).not.toBe(passwordEncrypted);
  135 |     });
  136 | 
  137 |     test(`API05: Delete user for ${newUsername}`, async ({ request }) => {
  138 |         const collection = await getUsersCollection();
  139 |         const user = await collection.findOne({
  140 |           username: newUsername,
  141 |         });
```