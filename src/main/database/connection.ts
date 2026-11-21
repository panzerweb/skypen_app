import Database from "better-sqlite3";
import { app } from "electron";
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { WORLDTABLE } from "./tables";

let database: Database.Database | null = null;

export function initializeDatabase(): void {
  if (database) return;

  const directory = join(app.getPath("userData"), "data");

  mkdirSync(directory, { recursive: true });

  const databasePath = join(directory, "skypen.db");

  database = new Database(databasePath, {
    timeout: 5000,
    verbose: console.log,
    fileMustExist: false,
  });

  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");

  database.exec(`
        ${WORLDTABLE}
    `);
}

export function getDatabase(): Database.Database {
  if (!database) {
    throw new Error("Database not initialized!");
  }

  return database;
}

export function closeDatabase(): void {
  database?.close();
  database = null;
}
