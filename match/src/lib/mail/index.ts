import nodemailer from "nodemailer";

interface mailSendObj {
  message: string;
  to: string;
  subject: string;
}

class Mail {
  public static async send({
    message,
    to,
    subject
  }: mailSendObj): Promise<void> {
    const transport = nodemailer.createTransport({
      host: process.env["MAILER_HOST"],
      port: Number(process.env["MAILER_PORT"]),
      auth: {
        user: process.env["MAILER_USER"],
        pass: process.env["MAILER_PASSWORD"]
      }
    });

    await transport.sendMail({
      from: {
        name: process.env["MAILER_USER"],
        address: process.env["MAILER_USER"]
      },
      to: {
        name: to,
        address: to
      },
      subject,
      html: message
    });
  }
}

export { Mail };
