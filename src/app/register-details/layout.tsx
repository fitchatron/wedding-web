import BaseLayout from "@/components/BaseLayout";
import { type Metadata } from "next";

type Props = { children: React.ReactNode };

export const metadata: Metadata = {
  title: "Register Details",
  description: "Register your details here for updates and invites",
};

export default function Layout({ children }: Readonly<Props>) {
  return (
    <BaseLayout>
      <div>{children}</div>
    </BaseLayout>
  );
}
