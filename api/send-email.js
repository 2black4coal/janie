import { Resend } from "resend";

export async function POST(request) {
  console.log("🔥 API HIT");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    console.log("📦 BODY:", body);

    const { email, fullName, total, services, phone } = body;

    // ❌ validate
    if (!email || !fullName || !phone) {
      console.log("❌ Missing fields");
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ 1. Send email to CUSTOMER
    await resend.emails.send({
      from: "onboarding@resend.dev", // required unless domain verified
      to: email,
      subject: "We received your service request",
      html: `
        <p>Hi ${fullName},</p>
        <p>Thank you for booking with Janie-Care.</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
        <p><strong>Phone:</strong> ${phone}</p>
      `,
    });

    console.log("📨 Customer email sent");

    // ✅ 2. Send email to YOU (the owner)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "fb.axon.01@gmail.com",
      subject: "📥 New Janie-Care Booking Received",
      html: `
        <h3>New Booking Details</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Services:</strong> ${services}</p>
      `,
    });

    console.log("📨 Owner notification sent");

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
