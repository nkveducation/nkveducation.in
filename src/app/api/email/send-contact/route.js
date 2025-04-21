import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    await resend.emails.send({
      from: 'NKV Contact <officerdevkumar@gmail.com>',
      to: 'officerdevkumar@gmail.com',
      subject: `📩 New Contact Form from ${name}`,
      html: `
        <h2>📬 Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response("Error sending email", { status: 500 });
  }
}
