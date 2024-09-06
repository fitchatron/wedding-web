import { type ComponentType } from "react";
import { type PermissionID } from "@/lib/models/enums";

export type NavigationLink = {
  name: string;
  label: string;
  href: string;
  Icon?: ComponentType<{ className?: string }>;
  permission_id?: PermissionID;
};
