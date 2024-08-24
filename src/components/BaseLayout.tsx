import Navbar from "@/components/navigation/Navbar";
import PageFooter from "@/components/PageFooter";

type Props = {
  children: React.ReactNode;
};

export default function BaseLayout({ children }: Readonly<Props>) {
  return (
    <div className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
      <Navbar logoAsHomePage={false} logoSrc={""} />
      <main>{children}</main>
      <PageFooter />
    </div>
  );
}
