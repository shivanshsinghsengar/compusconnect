import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { generateNoteSummary } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const subject = formData.get("subject") as string;
    const semester = formData.get("semester") as string;
    const description = formData.get("description") as string;

    if (!file || !title || !subject || !semester) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(buffer, "notes");

    // Determine file type
    const fileType = file.type.includes("pdf") ? "PDF" : "IMAGE";

    // Generate AI summary
    const aiSummary = await generateNoteSummary(title, subject, description);

    // Create note in database
    const note = await prisma.note.create({
      data: {
        title,
        subject,
        semester,
        description: description || null,
        fileUrl: uploadResult.url,
        fileType,
        aiSummary,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    console.error("Note upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
