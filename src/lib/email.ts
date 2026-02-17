import nodemailer from 'nodemailer';

export async function sendEmail(to: string, subject: string, text: string) {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 25),
    secure: false,
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
  });

  await transport.sendMail({ from: process.env.SMTP_FROM, to, subject, text });
}
