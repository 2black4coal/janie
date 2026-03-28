import { Resend } from "resend";

export default async function handler(req, res) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { email, fullName, total, services } = JSON.parse(req.body);

    await resend.emails.send({
      from: "Janie-Care <no-reply@janiecare.com>",
      to: email,
      subject: "We received your service request",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for booking with Janie-Care.</p>
        <p>We’ve received your request and will contact you shortly.</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
        <p>Janie-Care Team</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
