import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "bogojemartin@gmail.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: Record<string, string>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { type } = body;

  // ── Contact page form ──────────────────────────────────────────────────────
  if (type === "contact") {
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName?.trim()) return NextResponse.json({ error: "First name is required" }, { status: 400 });
    if (!lastName?.trim()) return NextResponse.json({ error: "Last name is required" }, { status: 400 });
    if (!email?.trim() || !isValidEmail(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    try {
      await resend.emails.send({
        from: "Sottomonte Contact <onboarding@resend.dev>",
        to: TO_EMAIL,
        replyTo: email.trim(),
        subject: `New Contact Form Submission – ${firstName} ${lastName}`,
        html: `
          <h2>New contact form submission</h2>
          <table cellpadding="6" cellspacing="0">
            <tr><td><strong>Name</strong></td><td>${firstName.trim()} ${lastName.trim()}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
            ${phone?.trim() ? `<tr><td><strong>Phone</strong></td><td>${phone.trim()}</td></tr>` : ""}
            <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message.trim()}</td></tr>
          </table>
        `,
      });

      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Resend error (contact):", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  }

  // ── Listing inquiry form ───────────────────────────────────────────────────
  if (type === "inquiry") {
    const { fullName, email, phone, message, listingTitle, listingCity } = body;

    if (!fullName?.trim()) return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    if (!email?.trim() || !isValidEmail(email)) return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    if (!phone?.trim()) return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    if (!message?.trim()) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    try {
      await resend.emails.send({
        from: "Sottomonte Inquiry <onboarding@resend.dev>",
        to: TO_EMAIL,
        replyTo: email.trim(),
        subject: `New Inquiry – ${listingTitle ?? "Listing"} (${listingCity ?? ""})`,
        html: `
          <h2>New listing inquiry</h2>
          ${listingTitle ? `<p><strong>Listing:</strong> ${listingTitle}${listingCity ? ` — ${listingCity}` : ""}</p>` : ""}
          <table cellpadding="6" cellspacing="0">
            <tr><td><strong>Name</strong></td><td>${fullName.trim()}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone.trim()}</td></tr>
            <tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message.trim()}</td></tr>
          </table>
        `,
      });

      return NextResponse.json({ success: true });
    } catch (err) {
      console.error("Resend error (inquiry):", err);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
}
