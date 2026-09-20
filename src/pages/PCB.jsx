import PCBCard from "../components/PCBCard";

export default function PCB() {
  return (
    <div className="section">
      <h1>PCB Design Gallery</h1>

      <PCBCard
        title="Power Distribution Board"
        img="/pcb1.png"
        desc="4-layer board with isolated power rails and filtering."
      />

      <PCBCard
        title="Sensor Interface Board"
        img="/pcb2.png"
        desc="Compact board for analog sensor conditioning."
      />
    </div>
  );
}
