import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }

    // Vercel automatically parses JSON if Content-Type is application/json
    const data = req.body;

    const { email, fullName, total, services, phone } = data;

    if (!email || !fullName || !phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send email to customer
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Booking Received",
      html: `
        <p>Hi ${fullName},</p>
        <p>Total: $${total}</p>
        <p>Services: ${services}</p>
        <p>Phone: ${phone}</p>
      `,
    });

    // Send email to owner
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

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("💥 ERROR:", err);
    return res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}