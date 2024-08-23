import { type ComponentType } from "react";
import Link from "next/link";

type Props = {
  href: string;
  Icon?: ComponentType<{ className?: string }>;
  index: number;
  label: string;
};

export default function SecondaryLink({ href, Icon, index, label }: Props) {
  return (
    <Link href={href}>
      <div
        id={`user-menu-item-${index}`}
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
