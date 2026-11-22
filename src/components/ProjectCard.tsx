import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "../types";
import VideoPlayer from "./VideoPlayer";

type ProjectCardProps = {
  project: Project;
  index: number;
  open: boolean;
  onToggle: () => void;
};

export default function ProjectCard({
  project,
  index,
  open,
  onToggle,
}: ProjectCardProps) {
  const hasLinks = Boolean(project.github) || Boolean(project.live);

  return (
    <article className={open ? "project open" : "project"}>
      <button
        className="project-head"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`panel-${project.id}`}
      >
        <span className="project-num">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="project-title">
          {project.title}
          <span className="project-sub">{project.subtitle}</span>
        </span>
        <span className="project-period">{project.period}</span>
        <span className="project-toggle" aria-hidden="true">
          +
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={`panel-${project.id}`}
            className="project-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="project-inner">
              <div>
                <p className="project-event">{project.event}</p>
                <p className="project-summary">{project.summary}</p>
                <ul className="project-points">
                  {project.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="tech">
                  {project.tech.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github ? (
                    <a
                      className="link-line"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View code
                    </a>
                  ) : null}
                  {project.live ? (
                    <a
                      className="link-line"
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live site
                    </a>
                  ) : null}
                  {hasLinks ? null : (
                    <span className="muted">Links coming soon</span>
                  )}
                </div>
              </div>
              <div>
                <VideoPlayer src={project.video} title={project.title} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}
