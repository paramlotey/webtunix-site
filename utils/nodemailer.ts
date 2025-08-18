import nodemailer from "nodemailer";

interface Mail {
  to: string[];
  subject: string;
  text: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.GOOGLE_CLIENT_ID,
    pass: process.env.GOOGLE_CLIENT_SECRET,
  },
});

export const sendMail = async ({ to, subject, text, html }: Mail) => {
  try {
    const info = await transporter.sendMail({
      from:process.env.GOOGLE_CLIENT_ID, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });
  } catch (err) {
    console.error("Error while sending mail", err);
  }
};
