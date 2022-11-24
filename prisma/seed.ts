import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // Connect to client
    await prisma.$connect()
    //.. write prisma client queries here

    await prisma.user.create({

        data: {
          name: 'Rich',
          email: 'hello@prisma.com',
          posts: {
            create: {
              title: 'My first post',
              body: 'Lots of really interesting stuff',
              slug: 'my-first-post',
            },
          },
        }
      })

    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })