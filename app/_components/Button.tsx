import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "black" | "white";
  size?: "sm" | "md" | "lg";
}

const colorClasses = {
  black:
    "bg-foreground text-background disabled:hover:bg-foreground hover:bg-black",
  white:
    "bg-background text-foreground disabled:hover:border-gray-300 hover:border-gray-400 border border-gray-300",
};

const sizeClasses = {
  sm: "min-w-[100px] max-h-10 px-3 py-3 text-sm",
  md: "min-w-[120px] max-h-11 px-4 py-3 text-base", // your current default
  lg: "min-w-[150px] max-h-13 px-6 py-4 text-base",
};

export default function Button({
  className,
  children,
  color = "black",
  size = "md",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "font-medium transition-all  disabled:opacity-80 disabled:cursor-not-allowed min-w-[120px] max-h-11 px-4 flex items-center justify-center cursor-pointer py-3",
        className && className,
        size && sizeClasses[size],
        color && colorClasses[color]
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
