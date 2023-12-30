import asyncHandler from "express-async-handler";
import nodemailer from "nodemailer";

export const sendEmail = asyncHandler(async (data) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Hey 👻" <abc@gmail.email>',
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message sent: %s", info.messageId);
});
