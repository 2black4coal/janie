import { Resend } from "resend";

export async function POST(request) {
  console.log("🔥 API HIT");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    console.log("📦 BODY:", body);

    const { email, fullName, total, services } = body;

    // ❌ validate
    if (!email || !fullName) {
      console.log("❌ Missing fields");
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ send email
    const result = await resend.emails.send({
      // ⚠️ MUST use this unless domain verified
      from: "onboarding@resend.dev",
      to: email,
      subject: "We received your service request",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for booking with Janie-Care.</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
      `,
    });

    console.log("✅ EMAIL SENT:", result);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("💥 ERROR:", error);

    return new Response(
      JSON.stringify({
        error: error.message || "Internal Server Error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}