import type { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

type InputRootProps = ComponentProps<"input"> & {};

export function Input({ className, ...props }: InputRootProps) {
  return (
    <input
      className={twMerge(
        "bg-navy-900 border-[0.5px] border-navy-500 h-10 flex items-center rounded-lg px-3 text-sm",
        className,
      )}
      {...props}
    />
  )
}
