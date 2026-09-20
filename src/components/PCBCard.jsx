import { Card } from "wix-style-react";

export default function PCBCard({ title, img, desc }) {
  return (
    <Card>
      <div style={{ padding: "20px" }}>
        <h3>{title}</h3>
        <img src={img} alt={title} style={{ width: "100%", borderRadius: "12px" }} />
        <p>{desc}</p>
      </div>
    </Card>
  );
}
