export default function Header() {
  return (
    <header className="header">
      <a className="brand" href="#" aria-label="CardioSense home">
        <span className="brand-mark">♥</span>
        <span>Cardio<span className="brand-light">Sense</span></span>
      </a>
      <nav className="nav-links" aria-label="Main navigation">
        <a href="#assessment">Assessment</a>
        <a href="#assessment" className="nav-cta">Check indicators <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
