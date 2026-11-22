import { profile } from "../data/profile";
import Reveal from "./Reveal";

export default function Contact() {
  const links = [
    { label: "LinkedIn", href: profile.linkedin },
    { label: "GitHub", href: profile.github },
  ].filter((link) => link.href);

  return (
    <section id="contact">
      <div className="container">
        <Reveal>
          <h2 className="section-title">Contact</h2>
          <p className="contact-line">
            I am looking for internship and entry-level roles in software
            engineering and product. If you are hiring, I would like to hear
            from you.
          </p>
          <div className="contact-actions">
            <a className="btn btn-solid" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {links.map((link) => (
              <a
                key={link.label}
                className="link-line"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
