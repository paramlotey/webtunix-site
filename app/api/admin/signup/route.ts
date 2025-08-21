import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendMail } from "@/utils/nodemailer";


export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Check if admin already exists
    const existing_admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existing_admin) {
      return NextResponse.json(
        {
          message: "Admin already exists. Please login.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Create new admin
    const new_admin = await prisma.admin.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
      },
    });

    return NextResponse.json(
      {
        message: "Admin registered successfully.",
        admin: {
          id: new_admin.id,
          name: new_admin.name,
          email: new_admin.email,
        },
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required", success: false },
        { status: 400 }
      );
    }

    const existing_admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!existing_admin) {
      return NextResponse.json(
        { message: "Admin not found", success: false },
        { status: 404 }
      );
    }
    const reset_otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000);
    await sendMail({
      to: [email],
      subject: "Reset Your Profile Password",
      text: `Your OTP is: ${reset_otp}`,
      html: `<!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 0; }
          .container { background-color: #ffffff; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          h1 { color: #333333; }
          p { color: #555555; }
          .otp { font-size: 24px; font-weight: bold; color: #1a73e8; margin: 20px 0; }
          .footer { font-size: 12px; color: #999999; margin-top: 40px; text-align: center; }
        </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset Request</h1>
            <p>Hello ${existing_admin.name},</p>
            <p>You recently requested to reset your password. Use the OTP below to complete the process:</p>
            <div class="otp">${reset_otp}</div>
            <p>If you didn’t request this, please ignore this email. Your password will remain unchanged.</p>
            <div class="footer">
              If you have any issues, please contact our support team.<br />
              &copy; ${new Date().getFullYear()} Your Company Name
            </div>
          </div>
        </body>
        </html>`,
    });

    await prisma.admin.update({
      where: { email },
      data: { resetOtp: reset_otp, otpExpiry: expiry },
    });

    return NextResponse.json(
      {
        message: "OTP sent to your email. Please verify to reset password.",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const { email, otp, new_password } = await req.json();

    if (!email || !otp || !new_password) {
      return NextResponse.json(
        {
          message: "Email, OTP, and new password are required",
          success: false,
        },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Admin not found", success: false },
        { status: 404 }
      );
    }

    if (
      !admin.resetOtp ||
      admin.resetOtp !== otp || 
      !admin.otpExpiry ||
      new Date() > admin.otpExpiry
    ) {
      return NextResponse.json(
        { message: "Invalid or expired OTP", success: false },
        { status: 401 }
      );
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);

    await prisma.admin.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetOtp: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json(
      { message: "Password updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        message: "Server Error",
        success: false,
      },
      { status: 500 }
    );
  }
};
