export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("BigLogs Telegram Bot is running");
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const update = req.body;

  if (!token) {
    return res.status(500).json({ error: "Telegram bot token is missing" });
  }

  if (update.message) {
    const chatId = update.message.chat.id;
    const text = update.message.text || "";

    if (text === "/start") {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: "👋 Welcome to BigLogs!\n\nYour selected product will appear here. Let's get your order started."
        })
      });
    }
  }

  return res.status(200).json({ ok: true });
}
