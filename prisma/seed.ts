import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      email: "kody@whatever.com",
      // this is a hashed version of "twixrox"
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u",
    },
  });

  await Promise.all(
     getGrows().map((grow) => {
       const data = { growerId: kody.id, ...grow };
       return db.grow.create({ data });
    })
  );      
}

function getGrows() {

  return [
    {
      title: "title goes here",
      description : "description goes here",
      expectedDays: 60,
      strain: "durban",
  }
] 
}