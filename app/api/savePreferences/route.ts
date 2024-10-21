// app/api/savePreferences/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { mode, uiMode } = await request.json();

  // Set cookies for theme and uiMode preferences
  const response = NextResponse.json({ success: true });
  response.cookies.set("theme", mode, { path: "/", maxAge: 2592000 }); // 30 days
  response.cookies.set("uiMode", uiMode, { path: "/", maxAge: 2592000 }); // 30 days

  return response;
}
