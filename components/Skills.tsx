import Capabilities from "@/components/capabilities";
import Experience from "@/components/experience";

export default function Skills() {

  return (
    <section className="flex flex-col w-auto gap-8 lg:gap-48">
      <Experience />
      <Capabilities />
    </section>
  );
}