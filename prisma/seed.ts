import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();


async function seed() {
  const kody = await db.user.create({
    data: {
      username: "kody",
      email: "kody@whatever.com",
      passwordHash: process.env.PASSWORDHASH,
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