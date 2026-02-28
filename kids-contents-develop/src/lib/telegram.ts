const TELEGRAM_API_BASE = "https://api.telegram.org";

function getTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("Telegram config is missing");
  }

  return { token, chatId };
}

function getTelegramUrl(method: string, token: string) {
  return `${TELEGRAM_API_BASE}/bot${token}/${method}`;
}

export async function sendTelegramMessage(text: string) {
  const { token, chatId } = getTelegramConfig();

  const response = await fetch(getTelegramUrl("sendMessage", token), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Telegram sendMessage failed with ${response.status}`);
  }
}

export async function sendTelegramDocument(file: File, caption: string) {
  const { token, chatId } = getTelegramConfig();
  const formData = new FormData();

  formData.append("chat_id", chatId);
  formData.append("caption", caption);
  formData.append("parse_mode", "HTML");
  formData.append("document", file, file.name);

  const response = await fetch(getTelegramUrl("sendDocument", token), {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Telegram sendDocument failed with ${response.status}`);
  }
}
