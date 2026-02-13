import type { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

type CardRootProps = ComponentProps<"a"> & {};

function CardRoot({ className, ...props }: CardRootProps) {
  return (
    <a 
      href="/"
      className={twMerge(
        "bg-navy-700 border-[0.5px] border-navy-600 p-3 space-y-4 rounded-lg block",
        "hover:bg-navy-600/50 hover:border-navy-500 transition-colors duration-150",
        className,
      )}
      {...props}
    />
  )
}

type CardHeaderProps = ComponentProps<"header"> & {};

function CardHeader({ className, ...props }: CardHeaderProps) {
  return <header className={twMerge("flex flex-col gap-2", className)} {...props} />
}

type CardTitleProps = ComponentProps<"h2"> & {};

function CardTitle({ className, ...props }: CardTitleProps) {
  return <span className={twMerge("text-sm font-medium", className)} {...props} />
}

type CardNumberProps = ComponentProps<"span"> & {};

function CardNumber({ className, ...props }: CardNumberProps) {
  return <span className={twMerge("text-xs text-navy-200", className)} {...props} />
}

type CardFooterProps = ComponentProps<"footer"> & {};

function CardFooter({ className, ...props }: CardFooterProps) {
  return <footer className={twMerge("flex items-center gap-2", className)} {...props} />
}

export const Card = {
  Root: CardRoot,
  Title: CardTitle,
  Number: CardNumber,
  Header: CardHeader,
  Footer: CardFooter,
};
