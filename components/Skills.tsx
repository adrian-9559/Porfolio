import LenguajeProgramBackend from "@/components/leguajeProgramBackend";

export default function Skills() {
    const skills = [
      { name: "PHP", level: 60 },
      { name: "Java", level: 75 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 75 },
      { name: "NodeJS", level: 70 },
      { name: "TailwindCSS", level: 90 },
      { name: "MySQL", level: 80 },
      { name: "Git", level: 90 },
      { name: "AngularJS", level: 60 },
      { name: "Bootstrap", level: 50 },
      { name: "SQL", level: 80 },
    ];
  
    return (
      <section>
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 underline">Habilidades</h2>
        </section>
        <section className="flex flex-col">
          <section className="flex gap-6">
            <LenguajeProgramBackend />
            
          </section>
          
        </section>
      </section>
    );
  }