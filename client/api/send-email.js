import { Resend } from "resend";

export default async function handler(req, res) {
  console.log("🔥 METHOD:", req.method);

  // ✅ Fix 405
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { email, fullName, total, services, phone } = req.body;

    console.log("📦 BODY:", req.body);

    if (!email || !fullName || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Send to customer
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Booking received",
      html: `
        <p>Hi ${fullName},</p>
        <p>Total: $${total}</p>
        <p>Services: ${services}</p>
        <p>Phone: ${phone}</p>
      `,
    });

    // ✅ Send to you
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fb.axon.01@gmail.com",
      subject: "New Booking",
      html: `
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
      `,
    });

    console.log("✅ EMAILS SENT");

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("💥 ERROR:", error);

    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}