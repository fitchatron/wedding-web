import SideNavbar from "@/components/navigation/SideNavbar";

export default function Page() {
  return (
    <div className="page-container grid grid-cols-1 md:grid-cols-[250px_1fr] md:gap-4">
      <SideNavbar />
      <section>B</section>
    </div>
  );
}
