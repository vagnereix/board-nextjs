import type { ComponentProps } from "react";
import { twMerge } from 'tailwind-merge';

type SectionRootProps = ComponentProps<"div"> & {};

function SectionRoot({ className, ...props }: SectionRootProps) {
  return <div className={twMerge("bg-navy-800 rounded-xl border-[0.5px] border-navy-500 pt-3 flex flex-col gap-1", className)} {...props} />
}

type SectionHeaderProps = ComponentProps<"header"> & {};

function SectionHeader({ className, ...props }: SectionHeaderProps) {
  return <header className={twMerge("flex items-center justify-between px-3", className)} {...props} />
}

type SectionTitleProps = ComponentProps<"h2"> & {};

function SectionTitle({ className, ...props }: SectionTitleProps) {
  return <span className={twMerge("bg-navy-700 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs", className)} {...props} />
}

type SectionCountProps = ComponentProps<"span"> & {};

function SectionCount({ className, ...props }: SectionCountProps) {
  return <span className={twMerge("text-xs text-navy-200", className)} {...props} />
}

type SectionContentProps = ComponentProps<"main"> & {};

function SectionContent({ className, ...props }: SectionContentProps) {
  return <main className={twMerge("flex flex-col gap-2.5 overflow-y-auto p-3", className)} {...props} />
}

export const Section = {
  Root: SectionRoot,
  Title: SectionTitle,
  Count: SectionCount,
  Header: SectionHeader,
  Content: SectionContent,
};
