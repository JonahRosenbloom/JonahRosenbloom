import RepoCard from "../components/RepoCard";

export default function GitHub() {
  return (
    <div className="section">
      <h1>GitHub Projects</h1>

      <RepoCard
        name="boolean-toolkit"
        desc="Digital logic utilities written in C++."
        link="https://github.com/YOUR_USERNAME/boolean-toolkit"
      />

      <RepoCard
        name="embedded-sensor-node"
        desc="Firmware + hardware for a low-power sensor node."
        link="https://github.com/YOUR_USERNAME/embedded-sensor-node"
      />
    </div>
  );
}
