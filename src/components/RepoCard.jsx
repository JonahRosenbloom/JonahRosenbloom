import { Card } from "wix-style-react";

export default function RepoCard({ name, desc, link }) {
  return (
    <Card>
      <div style={{ padding: "20px" }}>
        <h3>{name}</h3>
        <p>{desc}</p>
        <a href={link} target="_blank" rel="noreferrer">View Repo</a>
      </div>
    </Card>
  );
}
