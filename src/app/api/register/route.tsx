import { createUser } from "@/server/data/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Parse the request body
    // Call the createUser function with the body
    await createUser(body);
    return NextResponse.json({ success: true, message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
