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
  base: "bg-slate-100 text-slate-800 border border-slate-200 hover:bg-slate-200",

  primary:
    "bg-emerald-600 text-white border border-emerald-700 hover:bg-emerald-700 active:bg-emerald-800 shadow-[var(--shadow-sm)]",

  outlined:
    "bg-white text-emerald-700 border border-emerald-700 hover:bg-emerald-700 hover:text-white",

  text:
    "bg-transparent text-slate-800 border-transparent hover:bg-slate-100",
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
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50",
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
