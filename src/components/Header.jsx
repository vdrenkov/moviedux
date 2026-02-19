import "../styles.css";

export default function Header() {
  return (
    <div className="header">
      <img className="logo" src="/logo.png" alt="Moviedux logo" />
      <h2 className="app-subtitle">
        It&apos;s time for popcorn! Find your next movie here.
      </h2>
    </div>
  );
}
