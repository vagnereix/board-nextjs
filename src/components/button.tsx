import type { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

type ButtonRootProps = ComponentProps<"button"> & {};

export function Button({ className, ...props }: ButtonRootProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "text-navy-100 flex items-center gap-2 rounded-lg px-2.5 py-1 bg-navy-600 cursor-pointer",
        "hover:bg-navy-500 transition-colors duration-150",
        className,
      )}
      {...props}
    />
  )
}
