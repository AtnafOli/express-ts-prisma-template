import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

const createPrismaClient = (): PrismaClient => {
  const client = new PrismaClient({
    log: ["query", "info", "warn", "error"], 
  });

  client.$connect().catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); 
  });

  return client;
};

// Init prisma client, using the global instance if it exists
if (process.env.NODE_ENV == "develo pment") {
  if (!global.__db) {
    global.__db = createPrismaClient();
  }
  db = global.__db;
} else {
  db = createPrismaClient();
}

export { db };
