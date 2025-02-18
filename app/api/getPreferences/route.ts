// This route is used to get user preferences for OS
// the route path is /api/getPreferences
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  let os = "mac"; // Default value
  const cookies = request.headers.get("cookie");

  if (cookies) {
    const cookieArray = cookies.split("; ").map((cookie) => cookie.split("="));
    const osCookie = cookieArray.find(([name]) => name === "os");
    if (osCookie) {
      os = osCookie[1];
    }
  }

  return NextResponse.json({ os });
}
