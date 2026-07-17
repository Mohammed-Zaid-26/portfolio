import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const INTERESTS = [
  "Collaboration",
  "Startup Idea",
  "Product Discussion",
  "Healthcare Tech Innovation",
  "Business Opportunity",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeMarkdown(text: string) {
  return text.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const company = String(body.company ?? "").trim();
  const linkedin = String(body.linkedin ?? "").trim();
  const message = String(body.message ?? "").trim();
  const interest = String(body.interest ?? "").trim();
  const website = String(body.website ?? "").trim(); // honeypot

  if (website) {
    // bot filled the hidden field — silently accept without sending
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message || !interest) {
    return NextResponse.json({ error: "Name, email, message and area of interest are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!INTERESTS.includes(interest)) {
    return NextResponse.json({ error: "Invalid area of interest." }, { status: 400 });
  }
  if (name.length > 120 || email.length > 160 || company.length > 160 || linkedin.length > 200 || message.length > 4000) {
    return NextResponse.json({ error: "One or more fields exceed the allowed length." }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ error: "Contact channel is not configured. Please email directly instead." }, { status: 500 });
  }

  const text = [
    "*New Portfolio Contact*",
    `*Name:* ${escapeMarkdown(name)}`,
    `*Email:* ${escapeMarkdown(email)}`,
    `*Company:* ${escapeMarkdown(company || "—")}`,
    `*LinkedIn:* ${escapeMarkdown(linkedin || "—")}`,
    `*Interest:* ${escapeMarkdown(interest)}`,
    `*Message:*\n${escapeMarkdown(message)}`,
  ].join("\n");

  const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "MarkdownV2",
    }),
  });

  if (!telegramRes.ok) {
    return NextResponse.json({ error: "Failed to deliver your message. Please try again or email directly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
