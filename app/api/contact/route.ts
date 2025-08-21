import { prisma } from "@/lib/prisma";
import { sendMail } from "@/utils/nodemailer";
import { NextRequest, NextResponse } from "next/server";


export const GET = async () => {
  try {
    const allContactResponses = await prisma.contact.findMany({
      orderBy: { id: "desc" },
    });
    return NextResponse.json({
      message: "All Enquires Fetched",
      allContactResponses,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Server Error",
      success: false,
    });
  }
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { email, first_name, last_name, message, phone } = body;

  try {
    const newEnquiry = await prisma.contact.create({
      data: { email, first_name, last_name, message, phone },
    });
    await sendMail({
      to: [email],
      subject: "Thank You for Contacting Us",
      text: `Hi ${first_name},\n\nThank you for reaching out to us. We will get back to you shortly.\n\nYour message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">Thank You for Contacting Us</h2>
          <p>Hi ${first_name},</p>
          <p>Thank you for reaching out. We have received your message and will get back to you shortly.</p>
          <h4>Your Details</h4>
          <ul>
            <li><strong>Name:</strong> ${first_name} ${last_name}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone:</strong> ${phone || "N/A"}</li>
          </ul>
          <h4>Your Message</h4>
          <blockquote style="border-left: 4px solid #ccc; margin: 10px 0; padding-left: 10px;">${message}</blockquote>
          <p>Best regards,<br/>The Team</p>
        </div>
      `,
    });
    return NextResponse.json({
      message: "Enquiry Submitted, We Will Contact You Shortly",
      newEnquiry,
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
      message: "Server Error",
      success: false,
    });
  }
};
