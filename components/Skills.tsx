import Capabilities from "@/components/capabilities";
import Experience from "@/components/experience";

export default function Skills() {

  return (
    <section className="flex flex-col gap-8 lg:gap-48">
      <Experience />
      <Capabilities />
    </section>
  );
}