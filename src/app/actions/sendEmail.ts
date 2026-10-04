"use server";

import { Resend } from "resend";
import ContactEmail from "@/emails/ContactEmail";

const FROM_ADDRESS = "AIPromptNest <promptnest@zentravolabs.com>";
const TO_ADDRESS = "hello.aipromptnest@gmail.com";

export type ContactFormState = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(formData: FormData): Promise<ContactFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const category = String(formData.get("category") ?? "General Inquiry").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Please fill out all required fields." };
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }
  if (
    name.length > 100 ||
    email.length > 200 ||
    subject.length > 200 ||
    category.length > 100 ||
    message.length > 5000
  ) {
    return { success: false, error: "One or more fields are too long." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return { success: false, error: "Email service is not configured. Please try again later." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: email,
      subject: `[${category}] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nCategory: ${category}\nSubject: ${subject}\n\n${message}`,
      react: ContactEmail({ name, email, category, subject, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: "Failed to send your message. Please try again." };
    }
    return { success: true };
  } catch (err) {
    console.error("sendContactEmail failed:", err);
    return { success: false, error: "Failed to send your message. Please try again." };
  }
}
