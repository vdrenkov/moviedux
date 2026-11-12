import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" aria-label="Moviedux home">
        <img className="logo" src="/logo.png" alt="Moviedux" />
      </Link>
      <p className="app-subtitle">Good stories. Great movie nights.</p>
    </header>
  );
}
