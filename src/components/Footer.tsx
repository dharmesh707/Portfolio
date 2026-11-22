import { profile } from "../data/profile";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
