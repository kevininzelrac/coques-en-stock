import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAuthorId = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  if (!user) throw new Error("Can't find authorId");
  return user.id;
};

const main = async () => {
  await prisma.user.upsert({
    where: { email: "kevin@prisma.io" },
    update: {
      fullname: "Kevin The Dude",
      firstname: "Kevin",
      lastname: "The Dude",
      role: "ADMIN",
      avatar:
        "https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4",
      credential: {
        update: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
    create: {
      email: "kevin@prisma.io",
      fullname: "Kevin The Dude",
      firstname: "Kevin",
      lastname: "The Dude",
      role: "ADMIN",
      avatar:
        "https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4",
      credential: {
        create: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
  });
  await prisma.user.upsert({
    where: { email: "dani@prisma.io" },
    update: {
      fullname: "Dani Caribeña",
      firstname: "Dani",
      lastname: "Caribeña",
      role: "FOLLOWER",
      avatar:
        "https://fastly.picsum.photos/id/884/200/200.jpg?hmac=BEameeYahafzsG-UCcyxl-la3nd2GolgYlQgWpd5krk",
      credential: {
        update: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
    create: {
      email: "dani@prisma.io",
      fullname: "Dani Caribeña",
      firstname: "Dani",
      lastname: "Caribeña",
      role: "FOLLOWER",
      avatar:
        "https://fastly.picsum.photos/id/962/200/200.jpg?hmac=XehF7z9JYkgC-2ZfSP05h7eyumIq9wNKUDoCLklIhr4",
      credential: {
        create: {
          passwordHash: process.env.PWD_HASH,
        },
      },
    },
  });

  // Création des types
  await prisma.type.createMany({
    data: [{ title: "page" }, { title: "blog" }, { title: "menu" }],
  });

  // Création des catégories
  await prisma.category.createMany({
    data: [{ title: "default" }],
  });

  await prisma.post.upsert({
    where: { title: "Hello World" },
    update: {
      content: "This is a test post",
      authorId: await getAuthorId("kevin@prisma.io"),
    },
    create: {
      title: "Hello World",
      content: "This is a test post",
      authorId: await getAuthorId("kevin@prisma.io"),
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
