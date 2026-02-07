import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    const admin = await prisma.admin.upsert({
        where: { email: 'admin@truthdefender.org' },
        update: {},
        create: {
            email: 'admin@truthdefender.org',
            name: 'Super Admin',
            password,
        },
    });

    const archive = await prisma.archive.create({
        data: {
            title: "The First Edition",
            description: "A scanned copy of the very first magazine edition from 1980.",
            type: "PDF",
            fileUrl: "https://example.com/sample.pdf",
            year: "1980",
        },
    });

    console.log({ admin, archive });

    console.log({ admin });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
