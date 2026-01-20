import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcryptjs";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this-in-prod";

export async function PUT(req: Request) {
    try {
        const { name, password, newPassword } = await req.json();

        // Get current user from cookie
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const secret = new TextEncoder().encode(JWT_SECRET);
        const { payload } = await jwtVerify(token, secret);
        const email = payload.email as string;

        // Find admin
        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return NextResponse.json({ error: "Admin not found" }, { status: 404 });
        }

        // Prepare update data
        const updateData: any = {};
        if (name) updateData.name = name;

        // If changing password
        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword, 10);
        }

        // Update admin
        await prisma.admin.update({
            where: { email },
            data: updateData
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Profile update error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
