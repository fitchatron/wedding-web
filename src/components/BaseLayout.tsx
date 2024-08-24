import Navbar from "@/components/navigation/Navbar";
import PageFooter from "@/components/PageFooter";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Readonly<Props>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Suspense>
        <Navbar logoAsHomePage={false} logoSrc={""} />
      </Suspense>
      <main>{children}</main>
      <PageFooter />
    </div>
  );
}
