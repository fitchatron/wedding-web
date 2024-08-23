import clsx from "clsx";
import Link from "next/link";

type Props = {
  href: string;
  isActive: boolean;
  label: string;
};

export default function PrimaryDesktopLink({ isActive, label, href }: Props) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "nav-link-text flex max-h-full min-h-16 items-center px-3 py-2 text-sm font-medium",
          isActive
            ? "border-b-4 border-indigo-600 dark:border-indigo-500"
            : "hover:border-b-4 hover:border-gray-400",
        )}
      >
        {label}
      </div>
    </Link>
  );
}
