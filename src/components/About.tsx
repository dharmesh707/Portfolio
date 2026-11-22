import { profile } from "../data/profile";
import Reveal from "./Reveal";

export default function About() {
  const edu = profile.education[0];

  return (
    <section id="about">
      <div className="container">
        <Reveal>
          <h2 className="section-title">About</h2>
        </Reveal>
        <div className="about-grid">
          <Reveal>
            <p className="about-text">{profile.about}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="facts">
              {edu ? (
                <div className="fact">
                  <dt>Education</dt>
                  <dd>
                    {edu.school}
                    <br />
                    {edu.degree}
                    <br />
                    {edu.period}, {edu.note}
                  </dd>
                </div>
              ) : null}
              <div className="fact">
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div className="fact">
                <dt>Languages</dt>
                <dd>{profile.languages.join(", ")}</dd>
              </div>
              <div className="fact">
                <dt>Email</dt>
                <dd>
                  <a className="link-line" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
