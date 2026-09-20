import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="section">
      <h1>Electrical Engineering Projects</h1>

      <ProjectCard
        title="Digital Logic Toolkit"
        desc="A C++ toolset for Boolean algebra, truth tables, and logic simplification."
      />

      <ProjectCard
        title="Embedded Sensor Node"
        desc="Low-power microcontroller system with temperature and humidity sensing."
      />

      <ProjectCard
        title="Power Supply Module"
        desc="Custom-designed DC-DC converter with filtering and protection circuits."
      />
    </div>
  );
}
