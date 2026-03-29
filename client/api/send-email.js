import { Resend } from "resend";

export default async function handler(req, res) {
  console.log("🔥 METHOD:", req.method);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // ⭐ Parse JSON manually (Vercel Node Functions)
    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }
    const data = JSON.parse(body);

    const { email, fullName, total, services, phone } = data;

    if (!email || !fullName || !phone) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send to customer
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

    // Send to you
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

    res.status(200).json({ success: true });

  } catch (error) {
    console.error("💥 ERROR:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}
