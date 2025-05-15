import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(username);
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        {
          status: 400,
        }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashpassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      {
        message: "user created successfully",
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 5000,
      }
    );
  }
}
