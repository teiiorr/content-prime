import clsx from "clsx";
import { Button as AntdButton, ButtonProps } from "antd";
import Link from "next/link";
import React from "react";

interface IProps extends ButtonProps {
  href?: string;
  target?: string;
  theme?: "base" | "primary" | "outlined" | "text";
  centered?: boolean;
  wide?: boolean;
}

const variants = {
  base:
    "border border-slate-200 bg-white text-slate-800 shadow-[0_8px_24px_-18px_rgba(15,23,42,0.45)] hover:border-slate-300 hover:bg-slate-50 hover:shadow-[0_14px_28px_-18px_rgba(15,23,42,0.35)]",

  primary:
    "border border-[#10264c] bg-gradient-to-b from-[#18325f] to-[#081327] text-white shadow-[0_18px_34px_-18px_rgba(8,19,39,0.78)] hover:from-[#1d3e73] hover:to-[#10264c] hover:shadow-[0_20px_38px_-18px_rgba(8,19,39,0.9)] active:from-[#10264c] active:to-[#081327]",

  outlined:
    "border border-[#18325f] bg-white/90 text-[#10264c] shadow-[0_8px_24px_-18px_rgba(8,19,39,0.35)] hover:bg-[#10264c] hover:text-white hover:shadow-[0_16px_30px_-16px_rgba(8,19,39,0.5)]",

  text:
    "border border-transparent bg-transparent text-slate-800 hover:bg-white/70 hover:text-slate-900",
};

export const Button: React.FC<IProps> = ({
  href,
  target,
  theme = "base",
  centered = false,
  wide = false,
  block = false,
  className = "",
  ...props
}) => {
  const baseStyles = clsx(
    [
      "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold",
      "relative overflow-hidden whitespace-nowrap",
      "transition-[transform,box-shadow,background-color,border-color,color] duration-200 ease-out",
      "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0",
      "active:scale-[0.985]",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#355f9a]/70 focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:active:scale-100",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full",
      "before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0",
      "before:translate-x-[-140%] before:transition-transform before:duration-500",
      "motion-safe:hover:before:translate-x-[140%]",
    ],
    variants[theme],
    wide && "px-10",
    block && "w-full",
    className
  );

  const wrapperStyles = clsx(centered && "mx-auto", block && "w-full");

  // обычная кнопка
  if (!href) {
    return (
      <AntdButton
        {...props}
        className={clsx(baseStyles, wrapperStyles)}
      />
    );
  }

  // кнопка-ссылка
  return (
    <Link href={href} target={target} className={wrapperStyles}>
      <AntdButton {...props} className={baseStyles} />
    </Link>
  );
};
