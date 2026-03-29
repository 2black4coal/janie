import { Resend } from "resend";

export default async function handler(req, res) {
  // 🔍 DEBUG: log method
  console.log("🔥 METHOD:", req.method);

  // ❌ Only allow POST
  if (req.method !== "POST") {
    console.log("❌ Invalid method:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 🔍 DEBUG: log incoming body
    console.log("📦 BODY:", req.body);

    const { email, fullName, total, services } = req.body;

    // ❌ Validate required fields
    if (!email || !fullName) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Send email
    const response = await resend.emails.send({
      // ⚠️ MUST use this unless your domain is verified
      from: "onboarding@resend.dev",
      to: email,
      subject: "We received your service request",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for booking with Janie Care.</p>
        <p>We’ve received your request and will contact you shortly.</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
        <p>Janie Care Team</p>
      `,
    });

    // 🔍 DEBUG: success log
    console.log("✅ EMAIL SENT:", response);

    return res.status(200).json({ success: true });

  } catch (error) {
    // 🔍 DEBUG: error log
    console.error("💥 ERROR:", error);

    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
}