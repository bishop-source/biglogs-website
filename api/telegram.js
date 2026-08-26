export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("BigLogs Telegram Bot is running");
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const update = req.body;

  if (!token) {
    return res.status(500).json({
      error: "Telegram bot token is missing"
    });
  }

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text || "";

    if (text.startsWith("/start")) {
      const product = text.replace("/start", "").trim();

      const message = product
        ? `👋 Welcome to BigLogs!\n\n🛍️ *${product}*\n\nYou've selected this product on our website.\n\nLet's get your order started.`
        : `👋 Welcome to BigLogs!\n\nYour selected product will appear here. Let's get your order started.`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown"
        })
      });
    }
  }

  return res.status(200).json({ ok: true });
}
