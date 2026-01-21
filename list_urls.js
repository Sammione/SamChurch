const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('--- Checking Magazines ---');
    const magazines = await prisma.magazine.findMany();
    magazines.forEach(m => {
        console.log(`ID: ${m.id}, Title: ${m.title}, PDF: ${m.pdfUrl}`);
    });

    console.log('\n--- Checking Books ---');
    const books = await prisma.book.findMany();
    books.forEach(b => {
        console.log(`ID: ${b.id}, Title: ${b.title}, PDF: ${b.pdfUrl}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
