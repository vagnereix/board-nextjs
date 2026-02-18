import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type HeaderRootProps = ComponentProps<"header"> & {};

function HeaderRoot({ className, ...props }: HeaderRootProps) {
  return <header className={twMerge("max-w-7xl mx-auto w-full flex items-center justify-between", className)} {...props} />
}

type HeaderContentProps = ComponentProps<"div"> & {};

function HeaderContent({ className, ...props }: HeaderContentProps) {
  return <div className={twMerge("space-y-1", className)} {...props} />
}

type HeaderTitleProps = ComponentProps<"h1"> & {};

function HeaderTitle({ className, ...props }: HeaderTitleProps) {
  return <h1 className={twMerge("font-semibold text-xl", className)} {...props} />
}

type HeaderDescriptionProps = ComponentProps<"p"> & {};

function HeaderDescription({ className, ...props }: HeaderDescriptionProps) {
  return <p className={twMerge("text-sm text-navy-100", className)} {...props} />
}

type HeaderFooterProps = ComponentProps<"div"> & {};

function HeaderFooter({ className, ...props }: HeaderFooterProps) {
  return <div className={twMerge("flex items-center gap-4", className)} {...props} />
}

export const Header = {
  Root: HeaderRoot,
  Content: HeaderContent,
  Title: HeaderTitle,
  Description: HeaderDescription,
  Footer: HeaderFooter,
}
