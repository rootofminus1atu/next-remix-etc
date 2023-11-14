import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function clearAllTables() {
  await db.joke.deleteMany()
  await db.user.deleteMany()
}

clearAllTables().finally(async () => {
  await db.$disconnect();
});
