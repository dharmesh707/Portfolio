import { useEffect, useState } from "react";
import { profile } from "../data/profile";

const links: [string, string][] = [
  ["home", "Home"],
  ["about", "About"],
  ["projects", "Projects"],
  ["achievements", "Achievements"],
  ["skills", "Skills"],
  ["contact", "Contact"],
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const [id] of links) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#home" className="nav-logo">
          {profile.name}
        </a>
        <div className="nav-links">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "active" : ""}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
