import { NextRequest, NextResponse } from "next/server";
import { listPDFs } from "@/lib/r2";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const search = searchParams.get("search") || undefined;

  try {
    const files = await listPDFs({ search });
    return NextResponse.json({ files });
  } catch (error) {
    console.error("Failed to list PDFs:", error);
    return NextResponse.json(
      { error: "Failed to list PDFs" },
      { status: 500 }
    );
  }
}
