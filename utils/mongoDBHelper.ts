import { MongoClient, Collection, Document } from "mongodb";
import { env } from "../config/env";

let client: MongoClient | undefined;

export async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    client = new MongoClient(env.mongoUri);
    await client.connect();
  }

  return client;
}

export async function getUsersCollection(): Promise<Collection<Document>> {
  const mongoClient = await getMongoClient();

  const db = mongoClient.db(env.mongoDb);

  return db.collection("users");
}

export async function closeMongoClient(): Promise<void> {
  if (client) {
    await client.close();
    client = undefined;
  }
}
