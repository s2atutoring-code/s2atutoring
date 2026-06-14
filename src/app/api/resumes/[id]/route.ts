import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const tutor = await prisma.tutor.findUnique({
      where: { id },
    });

    if (!tutor || !tutor.resume) {
      return new NextResponse("Resume not found", { status: 404 });
    }

    // Check if the resume field holds a base64 data URI
    if (!tutor.resume.startsWith("data:")) {
      return new NextResponse("Resume file format not supported", { status: 400 });
    }

    // Format: data:<mime-type>;base64,<payload>
    const matches = tutor.resume.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length < 3) {
      return new NextResponse("Invalid resume data format", { status: 400 });
    }

    const contentType = matches[1];
    const base64Data = matches[2];
    const fileBuffer = Buffer.from(base64Data, "base64");

    // Clean up name for filename safety
    const safeName = tutor.name.replace(/[^a-zA-Z0-9.-]/g, "_") || "Tutor";
    let extension = "pdf";
    if (contentType === "application/msword") {
      extension = "doc";
    } else if (
      contentType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      extension = "docx";
    }

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="resume-${safeName}.${extension}"`,
        "Content-Length": fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("Error serving resume:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
