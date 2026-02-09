import clsx from "clsx";
import { Button as AntdButton, ButtonProps } from "antd";
import Link from "next/link";

interface IProps extends ButtonProps {
  theme?: "base" | "primary" | "outlined" | "text";
  centered?: boolean;
  wide?: boolean;
}

const variants = {
  base: `
    text-blue-600 border-blue-100
    bg-blue-50
    hover:bg-blue-100 active:bg-blue-200
  `,

  primary: `
    bg-blue-600 text-white border-blue-700 border
    hover:bg-blue-700 active:bg-blue-800
  `,

  outlined: `
    bg-white text-blue-600 border-blue-200 border
    hover:bg-blue-50 hover:text-blue-700 hover:border-blue-600 active:bg-blue-100
  `,

  text: `
    bg-transparent text-blue-600 border-transparent
    hover:bg-blue-50 hover:text-blue-700 active:text-blue-800
  `,
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
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 ring-offset-white shadow-sm hover:shadow-md active:translate-y-[1px] disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-y-0",
    variants[theme],
    wide && "px-10",
    className
  );

  const wrapperStyles = clsx(centered && "mx-auto", block && "w-full");

  if (!href) {
    return (
      <AntdButton {...props} className={clsx(baseStyles, wrapperStyles)} />
    );
  }

  return (
    <Link href={href} target={target} className={wrapperStyles}>
      <AntdButton {...props} className={baseStyles} />
    </Link>
  );
};
