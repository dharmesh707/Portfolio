import { useState } from "react";
import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(projects[0]?.id ?? null);

  return (
    <section id="projects">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">
            Four products built end to end. Open one to see what it does, how it
            was built, and a demo.
          </p>
        </Reveal>
        <div className="project-list">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <ProjectCard
                project={project}
                index={i}
                open={openId === project.id}
                onToggle={() =>
                  setOpenId(openId === project.id ? null : project.id)
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
