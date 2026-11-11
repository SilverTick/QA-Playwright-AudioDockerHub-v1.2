import * as fs from "fs";

export function getTestData(fileName: string) {
  return JSON.parse(fs.readFileSync(`./test-data/${fileName}`, "utf8"));
}
