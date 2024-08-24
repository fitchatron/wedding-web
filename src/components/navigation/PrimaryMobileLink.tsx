import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
};

export default function PrimaryMobileLink({ label, href }: Props) {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <p
        aria-current="page"
        className={clsx(
          "block px-3 py-2 font-medium",
          pathname === href
            ? "border-l-4 border-indigo-600 bg-indigo-100 text-indigo-800 dark:border-indigo-500 dark:bg-indigo-300 dark:text-indigo-900"
            : "text-gray-800 hover:border-l-4 hover:border-gray-400 hover:bg-gray-100 dark:text-slate-100 dark:hover:dark:bg-slate-700",
        )}
      >
        {label}
      </p>
    </Link>
  );
}
