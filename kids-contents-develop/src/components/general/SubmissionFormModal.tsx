"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Modal, Input, Select, message } from "antd";
import { Lightbulb, CheckCircle2 } from "lucide-react";

import { ROUTES } from "@/constants";
import { Button } from "@/components";

interface SubmissionFormModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

interface IForm {
  full_name: string;
  address: string;
  phone: string;
  idea: string;
}

// O'zbekiston viloyatlari ro'yxati
const uzbekistanRegions = [
  { value: "toshkent_shahri", label: "Toshkent shahri" },
  { value: "toshkent", label: "Toshkent viloyati" },
  { value: "andijon", label: "Andijon viloyati" },
  { value: "buxoro", label: "Buxoro viloyati" },
  { value: "fargona", label: "Farg'ona viloyati" },
  { value: "jizzax", label: "Jizzax viloyati" },
  { value: "xorazm", label: "Xorazm viloyati" },
  { value: "namangan", label: "Namangan viloyati" },
  { value: "navoiy", label: "Navoiy viloyati" },
  { value: "qashqadaryo", label: "Qashqadaryo viloyati" },
  { value: "qoraqalpogiston", label: "Qoraqalpog'iston Respublikasi" },
  { value: "samarqand", label: "Samarqand viloyati" },
  { value: "sirdaryo", label: "Sirdaryo viloyati" },
  { value: "surxondaryo", label: "Surxondaryo viloyati" },
];

export function SubmissionFormModal({
  isModalOpen,
  onClose,
}: SubmissionFormModalProps) {
  const [form] = Form.useForm<IForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleCancel = useCallback(() => {
    form.resetFields();
    setShowSuccess(false);
    onClose();
  }, [form, onClose]);

  const handleSubmit = useCallback(
    async (values: IForm) => {
      setIsSubmitting(true);

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Form submitted:", values);

        setShowSuccess(true);
        form.resetFields();
      } catch (error) {
        message.error("Xatolik yuz berdi. Qaytadan urinib ko'ring.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [form]
  );

  const handleNavigateToStudios = useCallback(() => {
    router.push(ROUTES.STUDIOS);
    handleCancel();
  }, [router, handleCancel]);

  const SuccessContent = () => (
    <div className="relative text-center">
      {/* Close button */}
      <button
        onClick={handleCancel}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        aria-label="Close"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Success Icon */}
      <div className="mb-4 flex justify-center">
        <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50">
          <div className="absolute inset-0 rounded-2xl animate-pulse bg-emerald-100/70" />
          <CheckCircle2 className="relative z-10 text-emerald-700" size={28} />
        </div>
      </div>

      {/* Success Message */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">
          Ma'lumotingiz qabul qilindi.
        </h2>
        <p className="text-sm text-gray-600">
          Gʻoyangiz “Gʻoyalar banki”da maxfiy saqlanadi.
        </p>
      </div>

      {/* Navigate Button */}
      <Button block theme="primary" onClick={handleNavigateToStudios}>
        Studiyalar ro'yxatini ko'rish
      </Button>
    </div>
  );

  return (
    <Modal
      centered
      closable={!showSuccess}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose
      className="submission-modal"
      styles={{
        content: {
          borderRadius: "20px",
          padding: showSuccess ? "24px" : "28px",
          position: "relative",
          border: "1px solid rgba(203,213,225,0.65)",
          boxShadow: "0 34px 80px -44px rgba(15,23,42,0.28)",
          background: "rgba(255,255,255,0.96)",
        },
      }}
    >
      {showSuccess ? (
        <SuccessContent />
      ) : (
        <>
          <div className="mb-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#eef4e6] text-[#4e6140]">
                <Lightbulb size={20} />
              </div>
              <div className="min-w-0">
                <h2 className="text-2xl font-bold tracking-[-0.02em] text-gray-900 sm:text-3xl">
                  Sizda g'oya bormi?
                </h2>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Qisqa ma&apos;lumot qoldiring, jamoamiz ko&apos;rib chiqadi.
                </p>
              </div>
            </div>
          </div>

          <Form
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            className="submission-form"
            requiredMark={false}
          >
            {/* Full Name Field */}
            <Form.Item
              name="full_name"
              label={
                <span className="text-gray-700 font-medium text-base">
                  F.I.<span className="text-blue-500">*</span>
                </span>
              }
              rules={[
                { required: true, message: "F.I. kiritilishi shart!" },
                { min: 2, message: "Kamida 2ta harf kiriting!" },
              ]}
              className="mb-6"
            >
              <Input
                placeholder="Familiya Ism"
                size="large"
                  className="rounded-xl border-slate-200 hover:border-slate-300 focus:border-slate-400 transition-colors"
                style={{
                  height: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f8fafc",
                }}
              />
            </Form.Item>

            {/* Address Field - Select */}
            <Form.Item
              name="address"
              label={
                <span className="text-gray-700 font-medium text-base">
                  Yashash manzili <span className="text-blue-500">*</span>
                </span>
              }
              rules={[{ required: true, message: "Viloyat tanlanishi shart!" }]}
              className="mb-6"
            >
              <Select
                placeholder="Viloyatingizni tanlang"
                size="large"
                className="rounded-xl"
                style={{
                  height: "56px",
                }}
                options={uzbekistanRegions}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>

            {/* Phone Field */}
            <Form.Item
              name="phone"
              label={
                <span className="text-gray-700 font-medium text-base">
                  Telefon raqam <span className="text-blue-500">*</span>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Telefon raqam kiritilishi shart!",
                },
                {
                  pattern: /^[\+]?[0-9\s\-\(\)]{9,}$/,
                  message: "To'g'ri telefon raqamini kiriting!",
                },
              ]}
              className="mb-8"
            >
              <Input
                placeholder="Telefon raqam"
                size="large"
                className="rounded-xl border-slate-200 hover:border-slate-300 focus:border-slate-400 transition-colors"
                onFocus={() => {
                  const current = form.getFieldValue("phone");
                  if (!current || !String(current).trim()) {
                    form.setFieldValue("phone", "+998 ");
                  }
                }}
                onChange={(e) => {
                  const raw = e.target.value ?? "";
                  if (!raw) {
                    form.setFieldValue("phone", "+998 ");
                    return;
                  }
                  if (!raw.startsWith("+998")) {
                    const normalizedDigits = raw.replace(/[^\d]/g, "");
                    const withoutCountry = normalizedDigits.startsWith("998")
                      ? normalizedDigits.slice(3)
                      : normalizedDigits;
                    form.setFieldValue("phone", `+998 ${withoutCountry}`.trimEnd());
                  }
                }}
                style={{
                  height: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f8fafc",
                }}
              />
            </Form.Item>

            {/* Idea field */}
            <Form.Item
              name="idea"
              label={
                <span className="text-gray-700 font-medium text-base">
                  G‘oyangiz haqida qisqacha{" "}
                  <span className="text-blue-500">*</span>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "G‘oya haqida ma‘lumot kiritilishi shart!",
                },
                { max: 2000, message: "Maksimum 2000ta harf kiriting!" },
              ]}
              className="mb-12"
            >
              <Input.TextArea
                placeholder="G‘oyangizni kiriting..."
                size="large"
                className="rounded-xl border-slate-200 hover:border-slate-300 focus:border-slate-400 transition-colors"
                showCount
                maxLength={2000}
                style={{
                  minHeight: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f8fafc",
                }}
              />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item className="mb-0">
              <Button
                block
                theme="primary"
                htmlType="submit"
                loading={isSubmitting}
                className="h-14 text-lg font-semibold rounded-xl"
                style={{ boxShadow: "none" }}
              >
                {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      <style jsx>{`
        .submission-modal .ant-modal-content {
          box-shadow: 0 32px 80px -42px rgba(15, 23, 42, 0.25);
          backdrop-filter: blur(12px);
        }

        .submission-form .ant-form-item-label > label {
          height: auto;
          line-height: 1.4;
        }

        .submission-form .ant-input:focus,
        .submission-form .ant-input-focused,
        .submission-form .ant-select-focused .ant-select-selector {
          box-shadow: 0 0 0 2px rgba(148, 163, 184, 0.2);
        }

        .submission-form .ant-form-item {
          margin-bottom: 0;
        }

        .submission-form .ant-form-item-explain-error {
          font-size: 14px;
          margin-top: 4px;
        }
      `}</style>
    </Modal>
  );
}
