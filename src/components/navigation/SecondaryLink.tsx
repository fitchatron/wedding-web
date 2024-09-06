"use client";
import Link from "next/link";
import { type NavigationLink } from "@/lib/models/navigation-link";

type Props = {
  link: NavigationLink;
};

export default function SecondaryLink({
  link: { href, Icon, name, label },
}: Props) {
  return (
    <Link href={href}>
      <div
        id={name}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:text-slate-100 dark:hover:dark:bg-slate-700"
        role="menuitem"
        tabIndex={-1}
      >
        {Icon && <Icon className="h-6 w-6" />}
        <p>{label}</p>
      </div>
    </Link>
  );
}
