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
