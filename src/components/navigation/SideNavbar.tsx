"use client";
import { PermissionID } from "@/lib/models/enums";
import { type NavigationLink } from "@/lib/models/navigation-link";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import SideNavLink from "@components/navigation/SideNavLink";

export default function SideNavbar() {
  const links: NavigationLink[] = [
    {
      name: "admin_users",
      label: "Users",
      href: "/users",
      permission_id: PermissionID.ReadUserDetails,
      Icon: UserGroupIcon,
    },
    {
      name: "admin_roles",
      label: "Roles",
      href: "/roles",
      permission_id: PermissionID.ReadRoleDetails,
    },
    {
      name: "admin_permissions",
      label: "Permissions",
      href: "permissions",
      permission_id: PermissionID.ReadPermissionDetails,
    },
    {
      name: "registrations",
      label: "Registrations",
      href: "registrations",
      permission_id: PermissionID.ReadPermissionDetails,
    },
  ];
  return (
    <nav className="flex place-content-between gap-2 rounded-t bg-gray-100 px-2 py-4 dark:bg-slate-950 md:flex-col md:place-content-start md:rounded md:px-0 md:shadow">
      {links.map((link) => (
        <SideNavLink key={link.name} link={link} />
      ))}
    </nav>
  );
}
