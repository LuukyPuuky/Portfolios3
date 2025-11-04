export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ message: "Missing fields" }), {
      status: 400,
    });
  }

  try {
    const payload = {
      content: "**Nieuw contactformulier!**",
      embeds: [
        {
          fields: [
            { name: "Naam", value: name || "Onbekend" },
            { name: "Email", value: email || "Geen" },
            { name: "Bericht", value: message || "Geen bericht" },
          ],
        },
      ],
    };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL!;
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Failed to send message" }), {
      status: 500,
    });
  }
}
