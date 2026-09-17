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
    const { company, role, difficulty, ctc, rounds, tips, experience } = body;

    if (
      !company ||
      !role ||
      !difficulty ||
      !rounds ||
      !tips ||
      !experience
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!Array.isArray(rounds) || rounds.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one interview round" },
        { status: 400 }
      );
    }

    const placement = await prisma.placement.create({
      data: {
        company,
        role,
        difficulty,
        ctc: ctc || null,
        rounds,
        tips,
        experience,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ placement }, { status: 201 });
  } catch (error) {
    console.error("Placement share error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
