import { createRequire } from "module";
const require = createRequire(import.meta.url);
const sqlite3 = require("sqlite3").verbose();

const dbPath = "../database/f1db.db";

export const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(`Connected to the ${dbPath} SQlite database.`);
});

export function closeConnection() {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

export function openConnection() {
  db.open((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Open the database connection.");
  });
}
