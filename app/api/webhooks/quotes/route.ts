import { NextRequest, NextResponse } from "next/server";

const RESEND_API_URL = "https://api.resend.com/emails";

type QuoteWebhookPayload = {
  type?: string;
  table?: string;
  record?: {
    id?: string;
    name?: string;
    email?: string;
    company?: string | null;
    product_id?: string | null;
    product_name?: string | null;
    quantity?: number | null;
    details?: string | null;
    created_at?: string;
  };
};

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.QUOTE_WEBHOOK_SECRET;
  const providedSecret = request.headers.get("x-webhook-secret");

  if (!webhookSecret || providedSecret !== webhookSecret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.QUOTE_NOTIFICATION_EMAIL;
  const fromEmail = process.env.QUOTE_NOTIFICATION_FROM;

  if (!resendApiKey || !notifyEmail || !fromEmail) {
    return NextResponse.json(
      {
        error:
          "Falta configurar RESEND_API_KEY, QUOTE_NOTIFICATION_EMAIL o QUOTE_NOTIFICATION_FROM",
      },
      { status: 500 }
    );
  }

  let payload: QuoteWebhookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const quote = payload.record;

  if (!quote) {
    return NextResponse.json(
      { error: "Falta 'record' en el payload" },
      { status: 400 }
    );
  }

  const productLabel = quote.product_name || "Cotización general";
  const lines = [
    `Nombre: ${quote.name ?? "-"}`,
    `Email: ${quote.email ?? "-"}`,
    `Empresa: ${quote.company ?? "-"}`,
    `Producto: ${productLabel}`,
    `Cantidad: ${quote.quantity ?? "-"}`,
    `Detalles: ${quote.details ?? "-"}`,
  ];

  const emailResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: notifyEmail,
      subject: `Nueva cotización: ${productLabel}`,
      text: lines.join("\n"),
    }),
  });

  if (!emailResponse.ok) {
    const errorBody = await emailResponse.text();
    console.error("Error al enviar el email de notificación:", errorBody);
    return NextResponse.json(
      { error: "No se pudo enviar el email" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
