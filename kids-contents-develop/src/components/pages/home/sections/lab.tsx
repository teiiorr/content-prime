"use client";

import { ChangeEvent, FormEvent, memo, useMemo, useState } from "react";
import { CheckCircle2, CircleX, FileText, FileType, Send } from "lucide-react";
import { Button, Container, HomeSectionShell, Input, Textarea } from "@/components";

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
] as const;

type FormState = {
  fullName: string;
  birthDate: string;
  region: string;
  phone: string;
  occupation: string;
  hasExperience: "yes" | "no";
  experienceDirection: string;
  publishedWorksUrl: string;
  motivation: string;
  assignment1: File | null;
  assignment2: File | null;
  assignment3: File | null;
  assignment4: File | null;
};

const initialState: FormState = {
  fullName: "",
  birthDate: "",
  region: "",
  phone: "",
  occupation: "",
  hasExperience: "yes",
  experienceDirection: "",
  publishedWorksUrl: "",
  motivation: "",
  assignment1: null,
  assignment2: null,
  assignment3: null,
  assignment4: null,
};

const allowedFileMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isAllowedFile(file: File | null) {
  if (!file) return false;

  const lowerName = file.name.toLowerCase();
  const hasAllowedExtension = lowerName.endsWith(".pdf") || lowerName.endsWith(".docx");

  return allowedFileMimeTypes.has(file.type) || hasAllowedExtension;
}

function formatUzbekPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";

  const normalized = digits.startsWith("998") ? digits.slice(3) : digits;
  const local = normalized.slice(0, 9);

  let result = "+998";

  if (local.length > 0) {
    result += ` (${local.slice(0, 2)}`;
  }

  if (local.length >= 3) {
    result += `) ${local.slice(2, 5)}`;
  }

  if (local.length >= 6) {
    result += ` - ${local.slice(5, 7)}`;
  }

  if (local.length >= 8) {
    result += ` - ${local.slice(7, 9)}`;
  }

  return result;
}

function formatBirthDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}.${digits.slice(2)}`;

  return `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
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

function FileField({
  id,
  title,
  hint,
  file,
  onChange,
}: {
  id: keyof Pick<FormState, "assignment1" | "assignment2" | "assignment3" | "assignment4">;
  title: string;
  hint: string;
  file: File | null;
  onChange: (key: typeof id, file: File | null) => void;
}) {
  return (
    <label
      htmlFor={id}
      className="block rounded-2xl border border-dashed border-[#d3ddcf] bg-white/90 p-4 transition hover:border-[#98ad8e] hover:bg-[#fbfdf8] sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf4ea] text-[#506348]">
          <FileText size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-base font-semibold text-slate-950 sm:text-lg">{title}</div>
          <p className="mt-1 text-base leading-7 text-slate-600">{hint}</p>
          <div className="mt-3 flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f0d6c4] bg-[#fff4ec] px-3 py-1 text-sm font-medium text-[#a04d1c]">
                <FileText size={14} />
                PDF
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe0ff] bg-[#eef4ff] px-3 py-1 text-sm font-medium text-[#2557a7]">
                <FileType size={14} />
                DOCX
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
            <span className="max-w-full truncate text-left text-sm text-slate-950 sm:max-w-[48%] sm:text-right">
              {file ? file.name : ""}
            </span>
            <span className="inline-flex items-center gap-1.5 text-left text-sm font-medium text-slate-950 sm:text-right">
              {file ? <CheckCircle2 size={15} className="text-green-600" /> : <CircleX size={15} className="text-red-500" />}
              {file ? "Fayl tanlandi" : "Fayl tanlanmagan"}
            </span>
          </div>
        </div>
      </div>
      <input
        id={id}
        name={id}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(event) => onChange(id, event.target.files?.[0] ?? null)}
      />
    </label>
  );
}

export const HomeSectionsLab = memo(function HomeSectionsLab() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isValid = useMemo(() => {
    const hasBaseFields =
      Boolean(form.fullName.trim()) &&
      isValidBirthDate(form.birthDate.trim()) &&
      Boolean(form.region) &&
      Boolean(form.phone.trim()) &&
      Boolean(form.occupation.trim()) &&
      Boolean(form.hasExperience) &&
      Boolean(form.motivation.trim()) &&
      Boolean(form.assignment1) &&
      Boolean(form.assignment2) &&
      Boolean(form.assignment3) &&
      Boolean(form.assignment4);

    if (!hasBaseFields) return false;
    if (form.hasExperience === "yes" && !form.experienceDirection.trim()) return false;
    return true;
  }, [form]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]:
        name === "birthDate"
          ? formatBirthDate(value)
          : name === "phone"
            ? formatUzbekPhone(value)
            : value,
      ...(name === "hasExperience" && value === "no"
        ? { experienceDirection: "", publishedWorksUrl: "" }
        : {}),
    }));
  };

  const handleFileChange = (
    key: keyof Pick<FormState, "assignment1" | "assignment2" | "assignment3" | "assignment4">,
    file: File | null
  ) => {
    if (file && !isAllowedFile(file)) {
      setStatus("error");
      setErrorMessage("Faqat PDF yoki DOCX formatidagi fayllarni yuklash mumkin.");
      return;
    }

    setStatus((current) => (current === "error" ? "idle" : current));
    setErrorMessage("");
    setForm((current) => ({ ...current, [key]: file }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValid) {
      setStatus("error");
      setErrorMessage("Majburiy maydonlarni to'ldiring va barcha fayllarni yuklang.");
      return;
    }

    if (!isValidBirthDate(form.birthDate.trim())) {
      setStatus("error");
      setErrorMessage("Tug'ilgan sana to'g'ri formatda va haqiqiy sana bo'lishi kerak.");
      return;
    }

    const allFilesAreAllowed = [
      form.assignment1,
      form.assignment2,
      form.assignment3,
      form.assignment4,
    ].every((file) => isAllowedFile(file));

    if (!allFilesAreAllowed) {
      setStatus("error");
      setErrorMessage("Faqat PDF yoki DOCX formatidagi fayllarni yuklash mumkin.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value instanceof File) {
          payload.append(key, value);
          return;
        }

        if (typeof value === "string") {
          payload.append(key, value);
        }
      });

      const response = await fetch("/api/lab-submissions", {
        method: "POST",
        body: payload,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Ariza yuborilmadi.");
      }

      setForm(initialState);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Ariza yuborishda xatolik yuz berdi."
      );
    }
  };

  return (
    <section id="yusuf-roziqov-laboratoriyasi" className="bg-gradient-to-b from-[#eef5e8] to-transparent">
      <Container className="max-w-[1508px] px-2 py-6 sm:px-6 md:py-12 lg:py-16 2xl:max-w-[88%]">
        <div className="mx-auto mb-6 max-w-5xl px-1 text-center sm:mb-8">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Yusuf Roziqov ssenariy yozish laboratoriyasi
          </h2>
        </div>

        <HomeSectionShell className="overflow-hidden rounded-[20px] border-0 bg-[linear-gradient(135deg,#f9fdf6_0%,#f2f7ef_100%)] p-0 shadow-none sm:rounded-[24px] sm:border sm:border-[#d4e0ce] sm:shadow-[0_30px_80px_-50px_rgba(67,89,55,0.3)]">
          <div className="p-2 sm:p-8 xl:px-10 xl:py-8">
            {status === "success" ? (
              <div className="flex min-h-[520px] flex-col items-center justify-center rounded-[18px] bg-white/90 px-4 py-7 text-center sm:rounded-3xl sm:border sm:border-[#dce8d5] sm:px-6 sm:py-10">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#edf7ea] text-[#3d6b36]">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-slate-950 sm:text-3xl">
                  Rahmat! Sizning arizangiz qabul qilindi.
                </h3>
                <p className="mt-3 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Yusuf Roziqov va ekspertlar guruhi ijodiy ishlaringizni ko&apos;rib
                  chiqadi. Saralashdan o&apos;tgan nomzodlar bilan tez orada
                  bog&apos;lanamiz.
                </p>
                <p className="mt-3 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                  Bolalar uchun yozish katta mas&apos;uliyat. Sizga zafarlar tilaymiz!
                </p>
                <Button
                  theme="outlined"
                  className="mt-6"
                  onClick={() => {
                    setStatus("idle");
                    setErrorMessage("");
                  }}
                >
                  Yana ariza yuborish
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid items-stretch gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="flex h-full flex-col rounded-[18px] bg-white/92 p-3 sm:rounded-3xl sm:border sm:border-[#dde6d8] sm:p-6 xl:p-7">
                  <p className="mx-auto max-w-[34rem] text-center text-sm leading-7 text-slate-700 sm:text-lg sm:leading-8">
                    Assalomu alaykum!
                    <br />
                    <strong>Bolalar kontentini rivojlantirish markazi</strong> hamda
                    kinodramaturg va kinorejissyor <strong>Yusuf Roziqov</strong>ning ssenariy yozish
                    laboratoriyasiga ro&apos;yxatdan o&apos;tish bo&apos;limiga xush kelibsiz.
                    Bu yerda siz o&apos;z ijodiy ishlaringizni topshirishingiz va
                    laboratoriya ishtirokchisiga aylanishingiz mumkin.
                  </p>

                  <div className="mt-5 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="F.I.Sh." className="py-4 text-base placeholder:text-slate-700 sm:text-lg" />
                      <Input name="birthDate" value={form.birthDate} onChange={handleChange} placeholder="dd.mm.yyyy" inputMode="numeric" className="py-4 text-base placeholder:text-slate-700 sm:text-lg" />
                      <select
                        name="region"
                        value={form.region}
                        onChange={handleChange}
                        className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-base text-slate-900 sm:text-lg"
                      >
                        <option value="">Hududni tanlang</option>
                        {regions.map((region) => (
                          <option key={region} value={region}>
                            {region}
                          </option>
                        ))}
                      </select>
                      <div className="rounded-xl border border-slate-300 bg-white px-4 transition focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-green-600 focus-within:ring-offset-2">
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+998 (__) ___ - __ - __"
                          inputMode="numeric"
                          className="w-full border-0 bg-transparent px-0 py-4 text-base text-slate-900 outline-none ring-0 placeholder:text-slate-700 focus:border-0 focus:outline-none focus:ring-0 sm:text-lg"
                        />
                      </div>
                      <Input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Faoliyatingiz" className="py-4 text-base placeholder:text-slate-700 sm:text-lg sm:col-span-2" />
                    </div>

                    <div className="rounded-[18px] bg-[#f6faf3] p-3 sm:rounded-3xl sm:border sm:border-[#d8e2d2] sm:p-6">
                      <div className="text-left text-base font-semibold leading-7 text-slate-950 sm:text-center sm:text-lg">
                        Ilgari ssenariy yozish bo&apos;yicha tajribangiz bo&apos;lganmi?
                      </div>
                      <div className="mt-4 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:justify-center">
                        <button
                          type="button"
                          onClick={() => setForm((current) => ({ ...current, hasExperience: "yes" }))}
                          className={`w-full rounded-2xl border px-5 py-3 text-base font-semibold transition sm:min-w-[110px] sm:w-auto sm:rounded-full ${
                            form.hasExperience === "yes"
                              ? "border-[#1f8f4c] bg-[#1f8f4c] text-white"
                              : "border-[#b9dec7] bg-white text-[#1f8f4c]"
                          }`}
                        >
                          Ha
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setForm((current) => ({
                              ...current,
                              hasExperience: "no",
                              experienceDirection: "",
                              publishedWorksUrl: "",
                            }))
                          }
                          className={`w-full rounded-2xl border px-5 py-3 text-base font-semibold transition sm:min-w-[110px] sm:w-auto sm:rounded-full ${
                            form.hasExperience === "no"
                              ? "border-[#d84a4a] bg-[#d84a4a] text-white"
                              : "border-[#efc2c2] bg-white text-[#c43d3d]"
                          }`}
                        >
                          Yo&apos;q
                        </button>
                      </div>

                      {form.hasExperience === "yes" ? (
                        <div className="mt-4 grid gap-4">
                          <Input
                            name="experienceDirection"
                            value={form.experienceDirection}
                            onChange={handleChange}
                            placeholder="Nasr, she'riyat, dramaturgiya, blogerlik"
                            className="py-4 text-base placeholder:text-slate-700 sm:text-lg"
                          />
                          <Input
                            name="publishedWorksUrl"
                            value={form.publishedWorksUrl}
                            onChange={handleChange}
                            placeholder="Nashr etilgan ishlaringizga havola"
                            className="py-4 text-base placeholder:text-slate-700 sm:text-lg"
                          />
                        </div>
                      ) : null}

                      <div className="mt-4">
                        <Textarea
                          name="motivation"
                          value={form.motivation}
                          onChange={handleChange}
                          placeholder="Nima uchun aynan bolalar uchun yozishni istaysiz?"
                          className="min-h-40 text-base leading-7 placeholder:text-slate-700 sm:text-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    {status === "error" && errorMessage ? (
                      <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700 sm:text-base">
                        {errorMessage}
                      </div>
                    ) : null}
                  </div>

                </div>

                <div className="flex h-full flex-col rounded-[18px] bg-white/92 p-3 sm:rounded-3xl sm:border sm:border-[#d8e2d2] sm:p-6 xl:p-7">
                  <div className="text-base font-semibold text-slate-950 sm:text-lg">Ijodiy ishlar</div>
                  <p className="mt-2 text-base leading-7 text-slate-600">
                    Har bir topshiriqni alohida fayl sifatida yuklang.
                  </p>

                  <div className="mt-4 grid flex-1 gap-3">
                    <FileField id="assignment1" file={form.assignment1} onChange={handleFileChange} title="1-topshiriq" hint="Bolaligingizdagi eng esda qolarli voqea haqida insho. (1-2 bet)" />
                    <FileField id="assignment2" file={form.assignment2} onChange={handleFileChange} title="2-topshiriq" hint="“Vatanparvarlik siz uchun nima?” mavzusidagi esse. (1-2 bet)" />
                    <FileField id="assignment3" file={form.assignment3} onChange={handleFileChange} title="3-topshiriq" hint="“Shum bola” filmiga yozilgan taqriz. (1 bet)" />
                    <FileField id="assignment4" file={form.assignment4} onChange={handleFileChange} title="4-topshiriq" hint="“Sen yetim emassan” filmiga taqriz. (1 bet)" />
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <Button
                    htmlType="submit"
                    theme="primary"
                    block
                    disabled={!isValid || status === "submitting"}
                    loading={status === "submitting"}
                    className="min-h-[58px] border-[#1d6fd6] bg-gradient-to-b from-[#2a8cff] to-[#0d6efd] text-lg text-white shadow-[0_18px_34px_-18px_rgba(13,110,253,0.75)] hover:from-[#4b9cff] hover:to-[#1d7bf2]"
                  >
                    <Send size={18} />
                    Arizani yuborish
                  </Button>
                </div>
              </form>
            )}
          </div>
        </HomeSectionShell>
      </Container>
    </section>
  );
});
