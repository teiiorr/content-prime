const fs = require("fs");
const path = require("path");

function loadEnvFile(filename) {
  const filePath = path.join(process.cwd(), filename);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

if (!BOT_TOKEN) throw new Error("TELEGRAM_BOT_TOKEN is required");
if (!ADMIN_CHAT_ID) throw new Error("TELEGRAM_CHAT_ID is required");

const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const sessions = new Map();
let offset = 0;

const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Andijon viloyati",
  "Buxoro viloyati",
  "Farg'ona viloyati",
  "Jizzax viloyati",
  "Xorazm viloyati",
  "Namangan viloyati",
  "Navoiy viloyati",
  "Qashqadaryo viloyati",
  "Qoraqalpog'iston Respublikasi",
  "Samarqand viloyati",
  "Sirdaryo viloyati",
  "Surxondaryo viloyati",
];

const FILE_FIELDS = [
  {
    key: "assignment1",
    title: "1-topshiriq",
    prompt:
      "1-topshiriqni PDF yoki Word (.docx) formatida yuboring.\n\nBolaligingizdagi eng esda qolarli voqea haqida insho. (1-2 bet).",
  },
  {
    key: "assignment2",
    title: "2-topshiriq",
    prompt:
      "2-topshiriqni PDF yoki Word (.docx) formatida yuboring.\n\n“Vatanparvarlik siz uchun nima?” mavzusidagi esse. (1-2 bet).",
  },
  {
    key: "assignment3",
    title: "3-topshiriq",
    prompt:
      "3-topshiriqni PDF yoki Word (.docx) formatida yuboring.\n\n\"Shum bola” filmiga yozilgan taqriz (1 bet).",
  },
  {
    key: "assignment4",
    title: "4-topshiriq",
    prompt:
      "4-topshiriqni PDF yoki Word (.docx) formatida yuboring.\n\n\"Sen yetim emassan” filmiga taqriz (1 bet).",
  },
];

const STEPS = {
  fullName: "fullName",
  birthDate: "birthDate",
  region: "region",
  phone: "phone",
  occupation: "occupation",
  hasExperience: "hasExperience",
  experienceDirection: "experienceDirection",
  publishedWorksUrl: "publishedWorksUrl",
  motivation: "motivation",
  assignment1: "assignment1",
  assignment2: "assignment2",
  assignment3: "assignment3",
  assignment4: "assignment4",
  done: "done",
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function isAllowedDocument(document) {
  const lowerName = String(document?.file_name || "").toLowerCase();
  return lowerName.endsWith(".docx") || lowerName.endsWith(".pdf");
}

function getInitialSession() {
  return {
    step: STEPS.fullName,
    data: {
      fullName: "",
      birthDate: "",
      region: "",
      phone: "",
      occupation: "",
      hasExperience: "",
      experienceDirection: "",
      publishedWorksUrl: "",
      motivation: "",
      assignment1: null,
      assignment2: null,
      assignment3: null,
      assignment4: null,
    },
  };
}

function regionKeyboard() {
  const rows = [];
  for (let i = 0; i < REGIONS.length; i += 2) {
    rows.push(REGIONS.slice(i, i + 2));
  }

  return {
    keyboard: rows,
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

function yesNoKeyboard() {
  return {
    keyboard: [["Ha", "Yo'q"]],
    resize_keyboard: true,
    one_time_keyboard: true,
  };
}

function removeKeyboard() {
  return {
    remove_keyboard: true,
  };
}

async function telegram(method, body) {
  const response = await fetch(`${TELEGRAM_API}/${method}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Telegram API error: ${response.status} ${text}`);
  }

  return response.json();
}

async function sendMessage(chatId, text, extra = {}) {
  return telegram("sendMessage", {
    chat_id: chatId,
    text,
    ...extra,
  });
}

async function sendAdminDocument(fileId, caption) {
  return telegram("sendDocument", {
    chat_id: ADMIN_CHAT_ID,
    document: fileId,
    caption,
    parse_mode: "HTML",
  });
}

function successLine(text) {
  return `✅ ${text}`;
}

function getStepLabel(step) {
  switch (step) {
    case STEPS.fullName:
      return "F.I.Sh.";
    case STEPS.birthDate:
      return "Tug'ilgan sana";
    case STEPS.region:
      return "Hudud";
    case STEPS.phone:
      return "Telefon";
    case STEPS.occupation:
      return "Faoliyatingiz";
    case STEPS.hasExperience:
      return "Tajriba savoli";
    case STEPS.experienceDirection:
      return "Yo'nalish";
    case STEPS.publishedWorksUrl:
      return "Havola";
    case STEPS.motivation:
      return "Motivatsiya";
    default:
      return "Joriy bosqich";
  }
}

async function sendStepPrompt(chatId, step) {
  switch (step) {
    case STEPS.fullName:
      await sendMessage(chatId, "F.I.Sh.: Iltimos, to'liq ism, familiya va sharifingizni kiriting.", {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.birthDate:
      await sendMessage(chatId, "Tug'ilgan sana: Tug'ilgan sanangizni kiriting (Masalan: 01.10.1999).", {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.region:
      await sendMessage(chatId, "Hudud: Qaysi viloyat yoki shaharda istiqomat qilasiz?", {
        reply_markup: regionKeyboard(),
      });
      return;
    case STEPS.phone:
      await sendMessage(chatId, "Telefon: Bog'lanish uchun telefon raqamingizni kiriting.", {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.occupation:
      await sendMessage(
        chatId,
        "Faoliyatingiz: Hozirgi vaqtda nima ish bilan shug'ullanasiz? (Masalan: talaba, o'qituvchi, jurnalist va h.k.)",
        { reply_markup: removeKeyboard() }
      );
      return;
    case STEPS.hasExperience:
      await sendMessage(
        chatId,
        "Ilgari ssenariy yozish bo'yicha tajribangiz bo'lganmi?",
        { reply_markup: yesNoKeyboard() }
      );
      return;
    case STEPS.experienceDirection:
      await sendMessage(
        chatId,
        "Agar bo'lsa, qanday yo'nalishda? (Nashr, she'riyat, dramaturgiya, blogerlik).",
        { reply_markup: removeKeyboard() }
      );
      return;
    case STEPS.publishedWorksUrl:
      await sendMessage(chatId, "Nashr etilgan ishlaringizga havola (link). Agar yo'q bo'lsa, `yo'q` deb yozing.", {
        parse_mode: "Markdown",
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.motivation:
      await sendMessage(chatId, "Nima uchun aynan bolalar uchun yozishni istaysiz? (Qisqacha yozib qoldiring)", {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.assignment1:
      await sendMessage(chatId, FILE_FIELDS[0].prompt, {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.assignment2:
      await sendMessage(chatId, FILE_FIELDS[1].prompt, {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.assignment3:
      await sendMessage(chatId, FILE_FIELDS[2].prompt, {
        reply_markup: removeKeyboard(),
      });
      return;
    case STEPS.assignment4:
      await sendMessage(chatId, FILE_FIELDS[3].prompt, {
        reply_markup: removeKeyboard(),
      });
      return;
    default:
  }
}

function getNextStep(step, session) {
  switch (step) {
    case STEPS.fullName:
      return STEPS.birthDate;
    case STEPS.birthDate:
      return STEPS.region;
    case STEPS.region:
      return STEPS.phone;
    case STEPS.phone:
      return STEPS.occupation;
    case STEPS.occupation:
      return STEPS.hasExperience;
    case STEPS.hasExperience:
      return session.data.hasExperience === "yes" ? STEPS.experienceDirection : STEPS.motivation;
    case STEPS.experienceDirection:
      return STEPS.publishedWorksUrl;
    case STEPS.publishedWorksUrl:
      return STEPS.motivation;
    case STEPS.motivation:
      return STEPS.assignment1;
    case STEPS.assignment1:
      return STEPS.assignment2;
    case STEPS.assignment2:
      return STEPS.assignment3;
    case STEPS.assignment3:
      return STEPS.assignment4;
    case STEPS.assignment4:
      return STEPS.done;
    default:
      return STEPS.done;
  }
}

async function startApplication(chatId) {
  sessions.set(chatId, getInitialSession());
  await sendMessage(
    chatId,
    [
      "Assalomu alaykum! Bolalar kontentini rivojlantirish markazi hamda kinodramaturg va kinorejissyor Yusuf Roziqovning ssenariy yozish laboratoriyasiga ro'yxatdan o'tish botiga xush kelibsiz.",
      "Bu yerda siz o'z ijodiy ishlaringizni topshirishingiz va laboratoriya ishtirokchisiga aylanishingiz mumkin.",
      "",
      "Arizani to'ldirishni boshlaymiz. Bekor qilish uchun /cancel yozing.",
    ].join("\n")
  );
  await sendStepPrompt(chatId, STEPS.fullName);
}

async function finishApplication(chatId, session) {
  const { data } = session;

  const summary = [
    "<b>Yangi ariza: Telegram bot orqali</b>",
    "",
    `<b>F.I.Sh.:</b> ${escapeHtml(data.fullName)}`,
    `<b>Tug'ilgan sana:</b> ${escapeHtml(data.birthDate)}`,
    `<b>Hudud:</b> ${escapeHtml(data.region)}`,
    `<b>Telefon:</b> ${escapeHtml(data.phone)}`,
    `<b>Faoliyati:</b> ${escapeHtml(data.occupation)}`,
    `<b>Tajriba bor:</b> ${data.hasExperience === "yes" ? "Ha" : "Yo'q"}`,
    data.hasExperience === "yes"
      ? `<b>Yo'nalish:</b> ${escapeHtml(data.experienceDirection)}`
      : null,
    data.publishedWorksUrl
      ? `<b>Nashr etilgan ishlar:</b> ${escapeHtml(data.publishedWorksUrl)}`
      : null,
    "",
    "<b>Motivatsiya:</b>",
    escapeHtml(data.motivation),
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendMessage(ADMIN_CHAT_ID, summary, {
      parse_mode: "HTML",
      disable_web_page_preview: true,
    });

    for (const field of FILE_FIELDS) {
      const file = data[field.key];
      await sendAdminDocument(file.fileId, `${escapeHtml(data.fullName)} | ${field.title}`);
    }

    sessions.delete(chatId);

    await sendMessage(
      chatId,
      [
        "Rahmat! Sizning arizangiz qabul qilindi. Yusuf Roziqov va ekspertlar guruhi ijodiy ishlaringizni ko'rib chiqadi. Saralashdan o'tgan nomzodlar bilan tez orada bog'lanamiz.",
        "",
        "Bolalar uchun yozish — katta mas'uliyat. Sizga zafarlar tilaymiz!",
      ].join("\n"),
      { reply_markup: removeKeyboard() }
    );
  } catch (error) {
    console.error("Failed to finish application:", error);
    await sendMessage(
      chatId,
      "Arizani yakunlashda xatolik yuz berdi. Guruhga yuborishda muammo bo'ldi. /apply bilan qayta urinib ko'ring.",
      { reply_markup: removeKeyboard() }
    );
  }
}

async function confirmAndAdvance(chatId, message, session) {
  await sendMessage(chatId, successLine(message), {
    reply_markup: removeKeyboard(),
  });

  session.step = getNextStep(session.step, session);

  if (session.step === STEPS.done) {
    await finishApplication(chatId, session);
    return;
  }

  await sendStepPrompt(chatId, session.step);
}

async function handleTextStep(chatId, text, session) {
  switch (session.step) {
    case STEPS.fullName:
      if (text.length < 5) {
        await sendMessage(chatId, "Iltimos, F.I.Sh.ni to'liqroq kiriting.");
        return;
      }
      session.data.fullName = text;
      await confirmAndAdvance(chatId, "F.I.Sh. qabul qilindi.", session);
      return;

    case STEPS.birthDate:
      if (!/^\d{2}\.\d{2}\.\d{4}$/.test(text)) {
        await sendMessage(chatId, "Tug'ilgan sana dd.mm.yyyy formatida bo'lishi kerak. Masalan: 01.10.1999");
        return;
      }
      session.data.birthDate = text;
      await confirmAndAdvance(chatId, "Tug'ilgan sana qabul qilindi.", session);
      return;

    case STEPS.region:
      if (!REGIONS.includes(text)) {
        await sendMessage(chatId, "Iltimos, hududni tugmalar orqali tanlang.");
        return;
      }
      session.data.region = text;
      await confirmAndAdvance(chatId, "Hudud qabul qilindi.", session);
      return;

    case STEPS.phone:
      if (text.replace(/\D/g, "").length < 9) {
        await sendMessage(chatId, "Telefon raqamini to'g'ri kiriting.");
        return;
      }
      session.data.phone = text;
      await confirmAndAdvance(chatId, "Telefon raqam qabul qilindi.", session);
      return;

    case STEPS.occupation:
      if (text.length < 3) {
        await sendMessage(chatId, "Faoliyat turini aniqroq kiriting.");
        return;
      }
      session.data.occupation = text;
      await confirmAndAdvance(chatId, "Faoliyatingiz qabul qilindi.", session);
      return;

    case STEPS.hasExperience: {
      const normalized = text.toLowerCase();
      if (!["ha", "yo'q", "yoq"].includes(normalized)) {
        await sendMessage(chatId, "Iltimos, Ha yoki Yo'q tugmasini tanlang.");
        return;
      }
      session.data.hasExperience = normalized === "ha" ? "yes" : "no";
      await confirmAndAdvance(chatId, "Javob qabul qilindi.", session);
      return;
    }

    case STEPS.experienceDirection:
      session.data.experienceDirection = text;
      await confirmAndAdvance(chatId, "Yo'nalish qabul qilindi.", session);
      return;

    case STEPS.publishedWorksUrl:
      session.data.publishedWorksUrl = text.toLowerCase() === "yo'q" ? "" : text;
      await confirmAndAdvance(chatId, "Havola qabul qilindi.", session);
      return;

    case STEPS.motivation:
      if (text.length < 10) {
        await sendMessage(chatId, "Iltimos, javobni qisqacha bo'lsa ham to'liqroq yozing.");
        return;
      }
      session.data.motivation = text;
      await confirmAndAdvance(chatId, "Motivatsiya qabul qilindi.", session);
      return;

    default:
      await sendMessage(chatId, "Bu bosqichda hujjat yuborish kerak.");
  }
}

async function handleDocumentStep(chatId, document, session) {
  const fileField = FILE_FIELDS.find((item) => item.key === session.step);

  if (!fileField) {
    await sendMessage(
      chatId,
      `${getStepLabel(session.step)} uchun hujjat emas, matn yuborilishi kerak.`
    );
    await sendStepPrompt(chatId, session.step);
    return;
  }

  if (!isAllowedDocument(document)) {
    await sendMessage(chatId, "Iltimos, faqat PDF yoki Word (.docx) formatidagi hujjat yuboring.");
    return;
  }

  session.data[fileField.key] = {
    fileId: document.file_id,
    fileName: document.file_name,
  };

  await confirmAndAdvance(chatId, `${fileField.title} qabul qilindi.`, session);
}

async function handleMessage(message) {
  const chatId = message?.chat?.id;
  const text = message?.text?.trim();
  const document = message?.document;

  if (!chatId) return;

  if (text === "/start") {
    await sendMessage(
      chatId,
      [
        "Assalomu alaykum! Bolalar kontentini rivojlantirish markazi hamda kinodramaturg va kinorejissyor Yusuf Roziqovning ssenariy yozish laboratoriyasiga ro'yxatdan o'tish botiga xush kelibsiz.",
        "Bu yerda siz o'z ijodiy ishlaringizni topshirishingiz va laboratoriya ishtirokchisiga aylanishingiz mumkin.",
        "",
        "Buyruqlar:",
        "/apply - ariza topshirishni boshlash",
        "/chatid - joriy chat ID ni ko'rish",
        "/help - yordam",
        "/cancel - joriy arizani bekor qilish",
      ].join("\n")
    );
    return;
  }

  if (text === "/help") {
    await sendMessage(
      chatId,
      "Bot arizani bosqichma-bosqich yig'adi. Hudud va Ha/Yo'q tanlovlari tugmalar orqali beriladi. Hujjatlar PDF yoki DOCX formatida qabul qilinadi."
    );
    return;
  }

  if (text === "/chatid") {
    await sendMessage(chatId, `Ushbu chat ID: ${chatId}`);
    return;
  }

  if (text === "/cancel") {
    sessions.delete(chatId);
    await sendMessage(chatId, "Joriy ariza bekor qilindi. Qayta boshlash uchun /apply yozing.", {
      reply_markup: removeKeyboard(),
    });
    return;
  }

  if (text === "/apply") {
    await startApplication(chatId);
    return;
  }

  const session = sessions.get(chatId);

  if (!session) {
    await sendMessage(chatId, "Ariza topshirish uchun /apply yozing.");
    return;
  }

  if (document) {
    await handleDocumentStep(chatId, document, session);
    return;
  }

  if (text) {
    await handleTextStep(chatId, text, session);
    return;
  }

  await sendMessage(chatId, "Matn yoki hujjat yuboring.");
}

async function poll() {
  while (true) {
    try {
      const data = await telegram("getUpdates", {
        offset,
        timeout: 30,
        allowed_updates: ["message"],
      });

      for (const update of data.result || []) {
        offset = update.update_id + 1;

        try {
          await handleMessage(update.message);
        } catch (error) {
          console.error("Update handling error:", error);

          const chatId = update?.message?.chat?.id;
          if (chatId) {
            try {
              await sendMessage(chatId, "Bot ichida xatolik yuz berdi. /apply bilan qayta urinib ko'ring.");
            } catch (nestedError) {
              console.error("Failed to notify user about bot error:", nestedError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Polling error:", error);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

poll();
