// This route is used to save user preferences for theme and OS
// the route path is /api/savePreferences
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { mode, os } = await request.json();
  // console.log("Received mode and os:", { mode, os });

  // Set cookies for theme and os preferences
  const response = NextResponse.json({ success: true });
  response.cookies.set("theme", mode, { path: "/", maxAge: 2592000 }); // 30 days
  response.cookies.set("os", os, { path: "/", maxAge: 2592000 }); // 30 days

  // console.log("Setting cookies for theme and os:", { mode, os });

  return response;
}
