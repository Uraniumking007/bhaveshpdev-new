"use server";

import nodemailer from "nodemailer";

type ContactFormState = {
  success: boolean;
  error?: string;
};

const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 1500;

const sanitize = (value: string) =>
  value
    .replace(/[\r\n]+/g, " ")
    .replace(/[<>]/g, (char) => ({ "<": "&lt;", ">": "&gt;" }[char] ?? ""))
    .trim();

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = (formData.get("company") as string | null) || "";
  if (honeypot.trim().length > 0) {
    return { success: false, error: "Invalid submission" };
  }

  const name = sanitize(String(formData.get("name") || ""));
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const message = sanitize(String(formData.get("message") || ""));

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" };
  }

  if (!isValidEmail(email)) {
    return { success: false, error: "Please provide a valid email" };
  }

  if (name.length > MAX_NAME_LENGTH) {
    return { success: false, error: "Name is too long" };
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return { success: false, error: "Message exceeds allowed length" };
  }

  const user = process.env.ZOHOMAIL_USER;
  const pass = process.env.ZOHOMAIL_PASS;
  if (!user || !pass) {
    console.error("Email credentials missing");
    return { success: false, error: "Email service unavailable" };
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <contact@bhaveshp.dev>`,
      to: "bhaveshpatil918@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="max-width:480px;margin:32px auto;padding:24px;background:#f9fafb;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.07);font-family:sans-serif;color:#222;">
          <div style="border-bottom:1px solid #e5e7eb;padding-bottom:12px;margin-bottom:20px;">
            <h2 style="margin:0;font-size:1.5rem;color:#2563eb;">📬 New Contact Form Submission</h2>
          </div>
          <div style="margin-bottom:16px;">
            <strong style="display:inline-block;width:90px;color:#6b7280;">Name:</strong>
            <span>${name}</span>
          </div>
          <div style="margin-bottom:16px;">
            <strong style="display:inline-block;width:90px;color:#6b7280;">Email:</strong>
            <span>${email}</span>
          </div>
          <div style="margin-bottom:24px;">
            <strong style="display:block;color:#6b7280;margin-bottom:6px;">Message:</strong>
            <div style="background:#e0e7ef;padding:16px 14px;border-radius:8px;color:#222;white-space:pre-line;">${message}</div>
          </div>
          <div style="border-top:1px solid #e5e7eb;padding-top:12px;text-align:right;font-size:0.95rem;color:#6b7280;">
            <span>Sent from <a href="https://bhaveshp.dev" style="color:#2563eb;text-decoration:none;">bhaveshp.dev</a></span>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);
    return { success: false, error: "Failed to send message" };
  }
}
