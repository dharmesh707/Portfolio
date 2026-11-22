import { profile } from "../data/profile";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">
            The tools I reach for most often, grouped by what they do.
          </p>
        </Reveal>
        <div className="rows">
          {Object.entries(profile.skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.05}>
              <div className="row">
                <span className="row-date">{group}</span>
                <div className="tech tech-plain">
                  {items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
