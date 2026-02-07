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

    // Create multiple archive entries
    const archives = await Promise.all([
        prisma.archive.create({
            data: {
                title: "Gospel Defender - First Issue",
                description: "The inaugural issue of Gospel Defender magazine published by Ezekiel Afolabi Akinyemi in 1967. A historic document marking the beginning of our ministry.",
                type: "PDF",
                fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
                coverUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                year: "1967",
            },
        }),
        prisma.archive.create({
            data: {
                title: "Defender of Truth - Revival Edition",
                description: "The first edition after the magazine was revived as 'Defender of Truth' in 1981. Contains foundational teachings on biblical doctrine.",
                type: "PDF",
                fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
                coverUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                year: "1981",
            },
        }),
        prisma.archive.create({
            data: {
                title: "The Nature of the Church - Audio Teaching",
                description: "A powerful sermon by the founding editor on the biblical understanding of the church. Recorded in 1985 during a special conference.",
                type: "AUDIO",
                fileUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp3",
                year: "1985",
            },
        }),
        prisma.archive.create({
            data: {
                title: "Baptism and Salvation - Classic Sermon",
                description: "An in-depth exposition on the relationship between baptism and salvation, addressing common misconceptions. A timeless teaching from 1978.",
                type: "AUDIO",
                fileUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp3",
                year: "1978",
            },
        }),
        prisma.archive.create({
            data: {
                title: "The Authority of Scripture",
                description: "A comprehensive document outlining the ministry's position on biblical authority and interpretation. Published in 1989.",
                type: "DOCUMENT",
                fileUrl: "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
                year: "1989",
            },
        }),
        prisma.archive.create({
            data: {
                title: "Conference Proceedings 1990",
                description: "Complete proceedings from the 1990 Annual Bible Conference, including all presentations and discussions on key doctrinal issues.",
                type: "PDF",
                fileUrl: "https://res.cloudinary.com/demo/image/upload/sample.pdf",
                coverUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                year: "1990",
            },
        }),
        prisma.archive.create({
            data: {
                title: "The Plan of Salvation - Radio Broadcast",
                description: "Historic radio broadcast series on the plan of salvation, aired in 1982. Digitally restored from original recordings.",
                type: "AUDIO",
                fileUrl: "https://res.cloudinary.com/demo/video/upload/sample.mp3",
                year: "1982",
            },
        }),
        prisma.archive.create({
            data: {
                title: "Ministry History Document",
                description: "A detailed historical account of the ministry's founding, growth, and impact from 1967 to 1995. Includes photographs and testimonies.",
                type: "DOCUMENT",
                fileUrl: "https://res.cloudinary.com/demo/raw/upload/sample.pdf",
                coverUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
                year: "1995",
            },
        }),
    ]);

    console.log({ admin, archivesCreated: archives.length });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
