import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


async function main() {
  const user1 = await prisma.user.upsert({
    where: {id: 1},
    update: {},
    create: {
      name: 'user1',
      genres: {
        create: [
          {
            name: "programming",
            todos: {
              create: [
                {
                  name: "html",
                  isChecked: false
                },
                {
                  name: "css",
                  isChecked: false
                },
              ]
            }
          },
          {
            name: "book",
            todos: {
              create: [
                {
                  name: "book1",
                  isChecked: false
                },
                {
                  name: "book2",
                  isChecked: false
                },
              ]
            }
          },
        ],
      },
    },
  })

  const user2 = await prisma.user.upsert({
    where: {id: 2},
    update: {},
    create: {
      name: 'user2',
      genres: {
        create: [
          {
            name: "game",
            todos: {
              create: [
                {
                  name: "apex",
                  isChecked: false
                },
                {
                  name: "pokemon",
                  isChecked: false
                },
              ]
            }
          },
        ]
      }
    },
  })


}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
