import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "santiagop.dev@gmail.com";

export async function POST(request: Request) {
  // La key vive en una variable de entorno (.env.local en tu PC, Environment Variables en Vercel).
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Contact form is not configured." }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  const { name, email, message } = await request.json().catch(() => ({}));

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string" || !name || !email || !message) {
    return Response.json({ error: "Name, email and message are required." }, { status: 400 });
  }

  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: [CONTACT_EMAIL],
    replyTo: email,
    subject: `Portfolio: mensaje de ${name}`,
    text: `${message}\n\n— ${name} (${email})`,
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 502 });
  }
  return Response.json(data);
}
