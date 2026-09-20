import { Button } from "wix-style-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px 40px",
      background: "white",
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ margin: 0 }}>Jonah Rosenbloom</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/"><Button>Home</Button></Link>
        <Link to="/about"><Button>About</Button></Link>
        <Link to="/projects"><Button>EE Projects</Button></Link>
        <Link to="/github"><Button>GitHub</Button></Link>
        <Link to="/pcb"><Button>PCB Gallery</Button></Link>
        <Link to="/contact"><Button>Contact</Button></Link>
      </div>
    </div>
  );
}
