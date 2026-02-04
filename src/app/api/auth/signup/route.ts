import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          status: "failed",
          message: "invalid data",
        },
        { status: 422 }
      );
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return NextResponse.json(
        { status: "failed", message: "User already exists" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({ email, password: hashedPassword });
    console.log(newUser);
    return NextResponse.json(
      { status: "success", message: "Created user!" },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error in signup route:", err);

    const isDev = process.env.NODE_ENV !== "production";

    return NextResponse.json(
      {
        status: "failed",
        message: "Error in connecting to DB",
        ...(isDev && { error: err?.message ?? "Unknown error" }),
      },
      { status: 500 }
    );
  }
}
