"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type NavigationLink } from "@/lib/models/navigation-link";

type Props = {
  link: NavigationLink;
};

export default function SideNavLink({
  link: { label, href, name, Icon },
}: Props) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        key={name}
        className={clsx(
          "flex w-full items-center gap-2 rounded px-4 py-2 md:gap-4 md:rounded-none",
          pathname === href
            ? "border-l-4 border-indigo-600 bg-indigo-100 text-indigo-800 hover:bg-indigo-800 hover:text-indigo-100 dark:border-indigo-500 dark:bg-indigo-300 dark:text-indigo-900"
            : "border-2 border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-600 md:border-none",
        )}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <div>{label}</div>
      </div>
    </Link>
  );
}
