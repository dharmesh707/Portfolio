import { certifications, hackathons } from "../data/achievements";
import Reveal from "./Reveal";

export default function Achievements() {
  return (
    <section id="achievements">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Achievements</h2>
          <p className="section-sub">
            Hackathons I have competed in and certifications I have completed.
          </p>
        </Reveal>

        <Reveal>
          <h3 className="sub-title">Hackathons</h3>
        </Reveal>
        <div className="rows">
          {hackathons.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.05}>
              <div className="row">
                <span className="row-date">{h.date}</span>
                <div>
                  <p className="row-title">{h.title}</p>
                  <p className="row-detail">{h.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <h3 className="sub-title sub-title-spaced">Certifications</h3>
        </Reveal>
        <div className="cert-grid">
          {certifications.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="cert">
                <p className="cert-meta">
                  {c.issuer}, {c.date}
                </p>
                <p className="cert-title">{c.title}</p>
                <p className="cert-detail">{c.detail}</p>
                {c.link ? (
                  <a
                    className="link-line"
                    href={c.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View certificate
                  </a>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
