"use client";

import { useState, type FormEvent } from "react";

const initialForm = { name: "", email: "", message: "" };

// Todavía no se muestra en la página: se termina en la fase del apartado "Contáctame".
export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onFormUpdate = (field: keyof typeof initialForm, value: string) => setForm({ ...form, [field]: value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus(res.ok ? "sent" : "error");
    if (res.ok) setForm(initialForm);
  };

  return (
    <div>
      <br />
      <h2 className="subtitulo" id="contact">
        Let&apos;s Contact
      </h2>
      <form onSubmit={handleSubmit} className="formulario-contacto">
        <input type="text" placeholder="Name" required value={form.name} onChange={(e) => onFormUpdate("name", e.target.value)} />
        <input type="email" placeholder="Email" required value={form.email} onChange={(e) => onFormUpdate("email", e.target.value)} />
        <textarea placeholder="Message" required value={form.message} onChange={(e) => onFormUpdate("message", e.target.value)} />
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "sent" && <p>Thanks! I&apos;ll get back to you soon.</p>}
        {status === "error" && <p>Something went wrong, please try again.</p>}
      </form>
    </div>
  );
}
