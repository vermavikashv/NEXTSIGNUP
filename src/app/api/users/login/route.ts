import { Connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

Connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "user not exists" },
        {
          status: 400,
        }
      );
    }

    const validpassword = await bcrypt.compare(password, user.password);

    if (!validpassword) {
      return NextResponse.json(
        { error: "Invalid Password" },
        {
          status: 400,
        }
      );
    }

    const TokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "login successfully",
      status: true,
    });
    return response;

    response.cookies.set("token", token, {
      httpOnly: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 5000,
      }
    );
  }
}
