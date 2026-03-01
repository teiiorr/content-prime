import { NextResponse } from "next/server";
import { sendTelegramDocument, sendTelegramMessage } from "@/lib/telegram";

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const regions = [
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getFile(formData: FormData, key: string) {
  const value = formData.get(key);
  return value instanceof File ? value : null;
}

function isValidBirthDate(value: string) {
  if (!/^\d{2}\.\d{2}\.\d{4}$/.test(value)) return false;

  const [dayString, monthString, yearString] = value.split(".");
  const day = Number(dayString);
  const month = Number(monthString);
  const year = Number(yearString);

  if (!day || !month || !year) return false;
  if (month < 1 || month > 12) return false;
  if (year < 1900 || year > new Date().getFullYear()) return false;

  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function validateFile(file: File | null, label: string) {
  if (!file || !file.size) {
    return `${label} yuklanishi shart.`;
  }

  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = lowerName.endsWith(".pdf") || lowerName.endsWith(".docx");

  if (!allowedMimeTypes.has(file.type) && !hasAllowedExtension) {
    return `${label} faqat PDF yoki DOCX bo'lishi kerak.`;
  }

  if (file.size > 20 * 1024 * 1024) {
    return `${label} hajmi 20 MB dan oshmasligi kerak.`;
  }

  return null;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const fullName = getString(formData, "fullName");
    const birthDate = getString(formData, "birthDate");
    const region = getString(formData, "region");
    const phone = getString(formData, "phone");
    const occupation = getString(formData, "occupation");
    const hasExperience = getString(formData, "hasExperience");
    const experienceDirection = getString(formData, "experienceDirection");
    const publishedWorksUrl = getString(formData, "publishedWorksUrl");
    const motivation = getString(formData, "motivation");

    const assignment1 = getFile(formData, "assignment1");
    const assignment2 = getFile(formData, "assignment2");
    const assignment3 = getFile(formData, "assignment3");
    const assignment4 = getFile(formData, "assignment4");

    if (!fullName || !birthDate || !region || !phone || !occupation || !hasExperience || !motivation) {
      return NextResponse.json(
        { message: "Majburiy maydonlar to'ldirilmagan." },
        { status: 400 }
      );
    }

    if (!isValidBirthDate(birthDate)) {
      return NextResponse.json(
        { message: "Tug'ilgan sana dd.mm.yyyy formatda va haqiqiy sana bo'lishi kerak." },
        { status: 400 }
      );
    }

    if (!regions.includes(region)) {
      return NextResponse.json({ message: "Hudud noto'g'ri tanlangan." }, { status: 400 });
    }

    const fileError =
      validateFile(assignment1, "1-topshiriq") ||
      validateFile(assignment2, "2-topshiriq") ||
      validateFile(assignment3, "3-topshiriq") ||
      validateFile(assignment4, "4-topshiriq");

    if (fileError) {
      return NextResponse.json({ message: fileError }, { status: 400 });
    }

    if (hasExperience === "yes" && !experienceDirection) {
      return NextResponse.json(
        { message: "Tajriba yo'nalishi ko'rsatilishi shart." },
        { status: 400 }
      );
    }

    const message = [
      "<b>Yangi ariza: Yusuf Roziqov laboratoriyasi</b>",
      "",
      `<b>F.I.Sh.:</b> ${escapeHtml(fullName)}`,
      `<b>Tug'ilgan sana:</b> ${escapeHtml(birthDate)}`,
      `<b>Hudud:</b> ${escapeHtml(region)}`,
      `<b>Telefon:</b> ${escapeHtml(phone)}`,
      `<b>Faoliyati:</b> ${escapeHtml(occupation)}`,
      `<b>Tajriba bor:</b> ${hasExperience === "yes" ? "Ha" : "Yo'q"}`,
      hasExperience === "yes"
        ? `<b>Yo'nalish:</b> ${escapeHtml(experienceDirection)}`
        : null,
      publishedWorksUrl
        ? `<b>Nashr etilgan ishlar:</b> ${escapeHtml(publishedWorksUrl)}`
        : null,
      "",
      "<b>Motivatsiya:</b>",
      escapeHtml(motivation),
    ]
      .filter(Boolean)
      .join("\n");

    await sendTelegramMessage(message);

    const documents: Array<[File, string]> = [
      [assignment1!, "1-topshiriq"],
      [assignment2!, "2-topshiriq"],
      [assignment3!, "3-topshiriq"],
      [assignment4!, "4-topshiriq"],
    ];

    for (const [file, label] of documents) {
      await sendTelegramDocument(file, `${escapeHtml(fullName)} | ${label}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lab submission failed", error);
    return NextResponse.json(
      { message: "Arizani yuborishda xatolik yuz berdi." },
      { status: 500 }
    );
  }
}
