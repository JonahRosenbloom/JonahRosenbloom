import { Card } from "wix-style-react";

export default function ProjectCard({ title, desc }) {
  return (
    <Card>
      <div style={{ padding: "20px" }}>
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </Card>
  );
}
