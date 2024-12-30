import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined; // eslint-disable-line
}

const db = globalThis.prismaClient || new PrismaClient();

if (process.env.NODE_ENV === "development") globalThis.prismaClient = db;

export default db;
