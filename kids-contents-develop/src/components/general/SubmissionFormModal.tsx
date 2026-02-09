"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { Form, Modal, Input, Select, message } from "antd";

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
    <div className="text-center">
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
        <svg
          width="66"
          height="66"
          viewBox="0 0 66 66"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="5" y="5" width="56" height="56" rx="28" fill="#DCFAE6" />
          <rect
            x="5"
            y="5"
            width="56"
            height="56"
            rx="28"
            stroke="#ECFDF3"
            stroke-width="9.33333"
          />
          <path
            d="M27.7487 33.0002L31.2487 36.5002L38.2487 29.5002M44.6654 33.0002C44.6654 39.4435 39.442 44.6668 32.9987 44.6668C26.5554 44.6668 21.332 39.4435 21.332 33.0002C21.332 26.5568 26.5554 21.3335 32.9987 21.3335C39.442 21.3335 44.6654 26.5568 44.6654 33.0002Z"
            stroke="#079455"
            stroke-width="2.33333"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
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
          borderRadius: "16px",
          padding: showSuccess ? "24px" : "32px",
          position: "relative",
        },
      }}
    >
      {showSuccess ? (
        <SuccessContent />
      ) : (
        <>
          <div className="text-center mb-8 flex items-center justify-center gap-3">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Sizda G'oya Bormi?
            </h2>
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mb-2"
            >
              <path
                d="M19.6661 24.4666C20.0661 23.1333 20.8661 21.9333 21.9328 20.9999C23.9328 19.3333 25.1994 16.7999 25.1994 13.9999C25.1994 8.79995 20.8661 4.53326 15.5328 4.79995C10.7994 4.99995 6.9327 8.99995 6.79938 13.7333C6.7327 16.6666 7.99938 19.2666 10.0661 20.9999C11.1994 21.9333 11.9994 23.1333 12.3994 24.4666H19.6661Z"
                fill="#FFD15C"
              />
              <path
                d="M15.1332 24.5998H15.7332L13.0665 14.6665C13.1332 14.6665 13.1998 14.6665 13.2665 14.6665C13.5998 14.6665 13.9332 14.5332 14.1998 14.2665C14.3332 14.1332 14.4665 14.0665 14.6665 14.0665C14.8665 14.0665 14.9998 14.1332 15.1332 14.2665C15.5999 14.7998 16.3999 14.7998 16.8665 14.2665C16.9998 14.1332 17.1332 14.0665 17.3332 14.0665C17.4665 14.0665 17.6665 14.1332 17.7999 14.2665C18.0666 14.5332 18.3332 14.6665 18.7332 14.6665C18.7999 14.6665 18.8665 14.6665 18.9332 14.6665L16.3332 24.5998H16.9332L19.6665 14.1998C19.6665 14.0665 19.6665 13.9331 19.5332 13.8665C19.3999 13.7998 19.2665 13.8665 19.1999 13.9332C19.0666 14.0665 18.9332 14.1332 18.7999 14.1332C18.5999 14.1332 18.4666 14.0665 18.2666 13.9332C17.9999 13.6665 17.7333 13.5332 17.3999 13.5332C17.0665 13.5332 16.7999 13.6665 16.5332 13.9332C16.2665 14.1999 15.8665 14.1999 15.5999 13.9332C15.3999 13.6665 15.0666 13.5332 14.7332 13.5332C14.3999 13.5332 14.0665 13.6665 13.8665 13.9332C13.7332 14.0665 13.5332 14.1332 13.3332 14.1332C13.1999 14.1332 12.9999 14.0665 12.9332 13.9332C12.8665 13.8665 12.7332 13.7999 12.5999 13.8665C12.4666 13.9332 12.3999 14.0665 12.4666 14.1998L15.1332 24.5998Z"
                fill="white"
              />
              <path
                d="M13.9346 30.6001C14.2679 31.4001 15.0679 32.0001 16.0013 32.0001C16.9346 32.0001 17.7346 31.4001 18.0679 30.6001H13.9346Z"
                fill="#344A5E"
              />
              <path
                d="M18.4666 30.6666H13.5999C12.9332 30.6666 12.3999 30.1333 12.3999 29.4666V24.3999H19.6666V29.4666C19.6666 30.1332 19.1332 30.6666 18.4666 30.6666Z"
                fill="#344A5E"
              />
              <path
                d="M19.6023 26.9334H12.4023C12.0023 26.9334 11.6689 26.6001 11.6689 26.2001C11.6689 25.8001 12.0023 25.4668 12.4023 25.4668H19.6023C20.0023 25.4668 20.3356 25.8001 20.3356 26.2001C20.3356 26.6001 20.0023 26.9334 19.6023 26.9334Z"
                fill="#415A6B"
              />
              <path
                d="M19.6023 29.2664H12.4023C12.0023 29.2664 11.6689 28.9331 11.6689 28.5331C11.6689 28.1331 12.0023 27.7998 12.4023 27.7998H19.6023C20.0023 27.7998 20.3356 28.1331 20.3356 28.5331C20.3356 28.9331 20.0023 29.2664 19.6023 29.2664Z"
                fill="#415A6B"
              />
              <path
                d="M15.9977 0C15.6644 0 15.3311 0.266687 15.3311 0.666687V2.93337C15.3311 3.26669 15.5977 3.60006 15.9977 3.60006C16.3977 3.60006 16.6644 3.33337 16.6644 2.93337V0.666687C16.6644 0.266687 16.3311 0 15.9977 0Z"
                fill="#FFD15C"
              />
              <path
                d="M7.06787 4.06671C6.80119 3.80003 6.40119 3.80003 6.13456 4.06671C5.86794 4.3334 5.86787 4.7334 6.13456 5.00003L7.73456 6.60003C8.00125 6.86671 8.40125 6.86671 8.66788 6.60003C8.9345 6.33334 8.93456 5.93334 8.66788 5.66671L7.06787 4.06671Z"
                fill="#FFD15C"
              />
              <path
                d="M4.9988 13.2666H2.73212C2.3988 13.2666 2.06543 13.5333 2.06543 13.9333C2.06543 14.2666 2.33212 14.6 2.73212 14.6H4.9988C5.33212 14.6 5.66549 14.3333 5.66549 13.9333C5.66549 13.5999 5.33212 13.2666 4.9988 13.2666Z"
                fill="#FFD15C"
              />
              <path
                d="M7.73459 21.2669L6.13459 22.8669C5.8679 23.1336 5.8679 23.5336 6.13459 23.8002C6.40127 24.0668 6.80127 24.0669 7.0679 23.8002L8.6679 22.2002C8.93459 21.9335 8.93459 21.5335 8.6679 21.2669C8.40121 21.0003 8.00127 21.0002 7.73459 21.2669Z"
                fill="#FFD15C"
              />
              <path
                d="M24.2647 21.2669C23.9981 21.0002 23.5981 21.0002 23.3314 21.2669C23.0647 21.5336 23.0647 21.9336 23.3314 22.2002L24.9314 23.8002C25.1981 24.0669 25.5981 24.0669 25.8647 23.8002C26.1313 23.5335 26.1314 23.1335 25.8647 22.8669L24.2647 21.2669Z"
                fill="#FFD15C"
              />
              <path
                d="M29.2644 13.2666H26.9977C26.6644 13.2666 26.3311 13.5333 26.3311 13.9333C26.3311 14.2666 26.5977 14.6 26.9977 14.6H29.2644C29.5977 14.6 29.9311 14.3333 29.9311 13.9333C29.9311 13.5999 29.6644 13.2666 29.2644 13.2666Z"
                fill="#FFD15C"
              />
              <path
                d="M24.9314 4.06669L23.3314 5.66669C23.0647 5.93338 23.0647 6.33338 23.3314 6.6C23.5981 6.86669 23.998 6.86669 24.2647 6.6L25.8647 5C26.1314 4.73332 26.1314 4.33332 25.8647 4.06669C25.598 3.80007 25.1981 3.8 24.9314 4.06669Z"
                fill="#FFD15C"
              />
            </svg>
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
                className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
                style={{
                  height: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f5f5f5",
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
                className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
                style={{
                  height: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f5f5f5",
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
                className="rounded-xl border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-colors"
                showCount
                maxLength={2000}
                style={{
                  minHeight: "56px",
                  fontSize: "16px",
                  backgroundColor: "#f5f5f5",
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
                style={{
                  backgroundColor: "#B2C300",
                  borderColor: "#B2C300",
                  boxShadow: "none",
                }}
              >
                {isSubmitting ? "Yuborilmoqda..." : "Yuborish"}
              </Button>
            </Form.Item>
          </Form>
        </>
      )}

      <style jsx>{`
        .submission-modal .ant-modal-content {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .submission-form .ant-form-item-label > label {
          height: auto;
          line-height: 1.4;
        }

        .submission-form .ant-input:focus,
        .submission-form .ant-input-focused,
        .submission-form .ant-select-focused .ant-select-selector {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
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
