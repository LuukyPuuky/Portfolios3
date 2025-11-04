export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: "Missing fields" }), {
        status: 400,
      });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl)
      throw new Error("DISCORD_WEBHOOK_URL not set in production!");

    const payload = {
      content: "Nieuw contactformulier!",
      embeds: [
        {
          fields: [
            { name: "Naam", value: name },
            { name: "Email", value: email },
            { name: "Bericht", value: message },
          ],
        },
      ],
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Discord webhook error: ${text}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ message: (err as Error).message }), {
      status: 500,
    });
  }
}
