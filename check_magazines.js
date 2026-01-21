const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const magazines = await prisma.magazine.findMany();
    console.log(JSON.stringify(magazines, null, 2));
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
