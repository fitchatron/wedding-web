import BaseLayout from "@/components/BaseLayout";
import BaseInput from "@/components/inputs/BaseInput";
import BaseLabel from "@/components/inputs/BaseLabel";
import Navbar from "@/components/navigation/Navbar";
import PageFooter from "@/components/PageFooter";
import Image from "next/image";

export default function HomePage() {
  return (
    <BaseLayout>
      <div className="h-64 bg-red-400">Hero Image</div>
      <section className="bg-pink-400 md:grid md:grid-cols-2">
        <div className="flex h-full w-full place-content-center bg-orange-400 md:relative md:h-72 md:items-start md:overflow-hidden">
          <Image
            className="md:absolute md:-top-12"
            objectFit="cover"
            // fill
            src={"/images/bennett_soph.jpeg"}
            alt="Bennett and Soph"
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={300}
            height={300}
          />
        </div>
        <div>
          <div className="bg-emerald-500">Find Invite</div>
          <div className="bg-indigo-500">Details</div>
        </div>
      </section>
    </BaseLayout>
  );
}
