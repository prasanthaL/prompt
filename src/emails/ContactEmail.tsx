import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "react-email";
import * as React from "react";

export interface ContactEmailProps {
  name: string;
  email: string;
  category: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  category,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{`New ${category} from ${name}: ${subject}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={header}>
            <Text style={brand}>AIPromptNest</Text>
            <Heading style={title}>New Contact Message</Heading>
          </Section>

          <Section style={content}>
            <Text style={badge}>{category}</Text>
            <Heading as="h2" style={subjectStyle}>
              {subject}
            </Heading>

            <Section style={meta}>
              <Text style={metaRow}>
                <span style={label}>From</span>
                <br />
                {name}
              </Text>
              <Text style={metaRow}>
                <span style={label}>Email</span>
                <br />
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Text>
            </Section>

            <Hr style={hr} />

            <Text style={label}>Message</Text>
            <Text style={messageStyle}>{message}</Text>

            <Link href={`mailto:${email}?subject=${encodeURIComponent(`Re: ${subject}`)}`} style={button}>
              Reply to {name}
            </Link>
          </Section>

          <Text style={footer}>
            Sent via the AIPromptNest contact form. Replying to this email goes directly to the sender.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

ContactEmail.PreviewProps = {
  name: "John Doe",
  email: "johndoe@example.com",
  category: "General Inquiry",
  subject: "How can I use prompts commercially?",
  message: "Hi team,\n\nI love the prompts. Can I use them in client projects?\n\nThanks!",
} satisfies ContactEmailProps;

const body: React.CSSProperties = {
  backgroundColor: "#f4f4f8",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  margin: 0,
  padding: "32px 0",
};
const container: React.CSSProperties = {
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  border: "1px solid #e5e5ef",
  borderRadius: "16px",
  overflow: "hidden",
};
const header: React.CSSProperties = {
  background: "linear-gradient(135deg, #6d4aff 0%, #a855f7 100%)",
  backgroundColor: "#7c3aed",
  padding: "28px 32px",
};
const brand: React.CSSProperties = {
  color: "#e9ddff",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  margin: "0 0 6px",
};
const title: React.CSSProperties = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: 700,
  margin: 0,
};
const content: React.CSSProperties = { padding: "28px 32px" };
const badge: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#f1ebff",
  color: "#6d28d9",
  border: "1px solid #ddd0fb",
  borderRadius: "999px",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  padding: "4px 12px",
  margin: "0 0 12px",
};
const subjectStyle: React.CSSProperties = {
  color: "#18181b",
  fontSize: "20px",
  fontWeight: 700,
  margin: "0 0 20px",
};
const meta: React.CSSProperties = {
  backgroundColor: "#f7f7fb",
  borderRadius: "12px",
  padding: "4px 16px",
};
const metaRow: React.CSSProperties = {
  color: "#27272a",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "12px 0",
};
const label: React.CSSProperties = {
  color: "#71717a",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};
const link: React.CSSProperties = { color: "#6d28d9", textDecoration: "none" };
const hr: React.CSSProperties = { borderColor: "#e5e5ef", margin: "24px 0" };
const messageStyle: React.CSSProperties = {
  color: "#3f3f46",
  fontSize: "15px",
  lineHeight: "24px",
  whiteSpace: "pre-wrap",
  margin: "8px 0 24px",
};
const button: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 700,
  textDecoration: "none",
  padding: "12px 24px",
  borderRadius: "10px",
};
const footer: React.CSSProperties = {
  color: "#a1a1aa",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center",
  padding: "0 32px 24px",
};
