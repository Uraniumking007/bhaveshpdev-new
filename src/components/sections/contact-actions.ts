"use server";

import nodemailer from "nodemailer";

export async function submitContactForm(
  prevState: { success: boolean },
  formData: FormData
) {
  // Extract form data
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHOMAIL_USER!,
      pass: process.env.ZOHOMAIL_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <contact@bhaveshp.dev>`,
      to: "bhaveshpatil918@gmail.com",
      replyTo: email,
      subject: "New Contact Form Submission",
      text: message,
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
    return { success: false };
  }
}
