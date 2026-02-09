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
  text-primary border-transparent
  bg-primary/5
  hover:bg-primary/10 active:bg-primary/15 dark:bg-white/10 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/15
  `,

  primary: `
  bg-green-600 text-white border-green-700 border border-b-2
  hover:bg-green-700 active:bg-green-800
  `,

  outlined: `
  bg-green-50 text-green-600 border-green-600 border border-b-2
  hover:bg-green-600 active:bg-green-700 hover:text-white
  `,

  text: `
  bg-transparent text-primary border-transparent
  hover:bg-primary/5 hover:text-green-700 active:text-green-800 dark:hover:bg-primary/10 dark:hover:text-white dark:active:text-white
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
    "gap-2 font-semibold rounded-xl shadow-none transition-all duration-300 outline-none active:outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 rounded-full active:ring-1 focus:ring-1 ring-gray-400 ring-offset-2 hover:scale-105",
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
