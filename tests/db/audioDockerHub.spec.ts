import { tags } from "../../config/tags";
import { test, expect } from "@playwright/test";
import users from "../../test-data/loginUsers.json";
import {
  getUsersCollection,
  closeMongoClient,
} from "../../utils/mongoDBHelper";
import { ObjectId } from "mongodb";

test.describe("MongoDB - CommonUser03 CRUD", {  tag: [tags.test.mongoDb, tags.module.userCRUD], }, () => {
  test.describe.configure({
    mode: "serial",
  });
  const commonUser03 = users.commonUser03;
  const password = "$2a$10$6mCJx90O.Y2cyZOlOC6RMuztR7X27Cte3gaekgkJtnstlIwfzwohu"; // encrypted for Sim123456db
  const newUsername = commonUser03.username + `z`;
  const newPassword = "$2a$10$V1dWyJkfEcDeZ5BjfxMKYeS3Pi8WL47.jjmk6NMTtGffXIjPIMi06"; // encrypted for Sim123456db + z

  test.afterAll(async () => {
    await closeMongoClient();
  });

  test(`DB01: Sign Up and read user for ${commonUser03.username}`, async () => {
    const collection = await getUsersCollection();
    await test.step(`Cleanup test date before testing`, async () => {
      await collection.deleteOne({ username:commonUser03.username });
      await collection.deleteOne({ username:newUsername });
    });
    const result = await collection.insertOne({
      username: commonUser03.username,
      password,
    });
    await test.step(`Validate - Sign Up for CommonUser03`, async () => {
      // Verify unique _id
      expect(result.insertedId).toBeInstanceOf(ObjectId);
      // Read document
      const doc = await collection.findOne({ username:commonUser03.username });
      expect(doc).not.toBeNull();
      expect(doc?._id).toEqual(result.insertedId);
      expect(doc?.username).toBe(commonUser03.username);
      expect(doc?.password).toBe(password);
      console.log(`\n✅ ${commonUser03.username} Document:`, doc);
    });
  });

  test(`DB02: User found for ${commonUser03.username}`, async () => {
    const collection = await getUsersCollection();
    const user = await collection.findOne({
      username:commonUser03.username,
    });
    await test.step(`Validate - Read for CommonUser03`, async () => {
      expect(user).not.toBeNull();
      console.log(`\n✅ ${commonUser03.username} found in DB:`, user);
    });
    await test.step(`Validate - 1 User Count for CommonUser03`, async () => {
      const userCount = await collection.countDocuments({
        username: commonUser03.username,
      });
      expect(userCount).toBe(1);
    });
  });

  test(`DB03: Update username and password for ${commonUser03.username}`, async () => {
    const collection = await getUsersCollection();
    const updatedUser = await collection.findOneAndUpdate(
      { username:commonUser03.username },
      {
        $set: {
          username: newUsername,
          password: newPassword,
        },
      },
      {
        returnDocument: "after",
      },
    );
    await test.step(`Validate - Updated username and password for CommonUser03`, async () => {
      expect(updatedUser).not.toBeNull();
      expect(updatedUser?.username).toBe(newUsername);
      expect(updatedUser?.password).toBe(newPassword);
      // Read updated document
      const user = await collection.findOne({
        username: newUsername,
      });
      expect(user).not.toBeNull();
      expect(user?.username).toBe(newUsername);
      expect(user?.password).toBe(newPassword);
      console.log("\n✅ User updated in DB:", user);
    });
  });

  test(`DB04: Delete user for ${newUsername}`, async () => {
    const collection = await getUsersCollection();
    const result = await collection.deleteOne({
      username: newUsername,
    });
    await test.step(`Validate - Deleted ${newUsername}`, async () => {
      expect(result.deletedCount).toBe(1);
    });
  });
});
