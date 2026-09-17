import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { company, role, status, appliedDate, notes } = body;

    if (!company || !role || !status || !appliedDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const application = await prisma.application.create({
      data: {
        company,
        role,
        status,
        appliedDate: new Date(appliedDate),
        notes: notes || null,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ application }, { status: 201 });
  } catch (error) {
    console.error("Application tracker error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
