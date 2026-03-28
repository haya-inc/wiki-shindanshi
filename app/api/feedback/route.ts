import { NextResponse } from "next/server";
import { z } from "zod";
import { submitFeedback } from "@/lib/docs-feedback";

export async function POST(request: Request) {
  try {
    const result = await submitFeedback(await request.json());
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: error.issues[0]?.message ?? "Feedback の入力が不正です。",
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Feedback の送信に失敗しました。",
      },
      { status: 500 },
    );
  }
}
