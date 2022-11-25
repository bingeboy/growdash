import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
    var __db: PrismaClient | undefined;
}

// server won't restart each time while in dev mode
if ( process.env.NODE_ENV === "production") {
    db = new PrismaClient;
    db.$connect();
} else {
    if(!global.__db) {
        global.__db = new PrismaClient();
        global.__db.$connect();
    }
    db = global.__db;
}

export { db };