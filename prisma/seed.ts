const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function main() {
  const categoryJob1 = await prisma.categoryJob.create({
    data: {
      name: 'Engineering',
    },
  });

  const categoryJob2 = await prisma.categoryJob.create({
    data: {
      name: 'Marketing',
    },
  });

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
