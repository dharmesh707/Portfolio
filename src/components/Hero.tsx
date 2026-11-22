import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "../data/profile";

export default function Hero() {
  const [imgFailed, setImgFailed] = useState(false);
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 700], [0, -60]);
  const textY = useTransform(scrollY, [0, 700], [0, 40]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.1]);

  const [first = "", last = ""] = profile.name.split(" ");
  const initials = `${first.charAt(0)}${last.charAt(0)}`;
  const showPhoto = Boolean(profile.photo) && !imgFailed;

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {first}
            <br />
            {last}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          >
            <p className="hero-role">{profile.role}</p>
            <p className="hero-tag">{profile.tagline}</p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-solid">
                View projects
              </a>
              <a href={`mailto:${profile.email}`} className="link-line">
                Email me
              </a>
              <a
                href={profile.linkedin}
                className="link-line"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              {profile.resume ? (
                <a href={profile.resume} download className="link-line">
                  Download resume
                </a>
              ) : null}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="photo-frame"
          style={{ y: photoY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
        >
          {showPhoto ? (
            <img
              src={profile.photo}
              alt={profile.name}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="photo-placeholder" aria-hidden="true">
              {initials}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
