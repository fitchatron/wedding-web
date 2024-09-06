import BaseLayout from "@/components/BaseLayout";
import { type Metadata } from "next";

type Props = { children: React.ReactNode };

export const metadata: Metadata = {
  title: "Admin",
  description: "Administer teh site here",
};

export default function Layout({ children }: Readonly<Props>) {
  return (
    <BaseLayout>
      <div>{children}</div>
    </BaseLayout>
  );
}
