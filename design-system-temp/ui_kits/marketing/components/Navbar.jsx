// Navbar — sticky, glassy, gradient wordmark, animated underline on active
function Navbar({ route, onNavigate, onLogin, onSignup }) {
  const items = [
    { id: 'home', label: 'Home' },
    { id: 'tutors', label: 'Tutors' },
    { id: 'about', label: 'About Us' },
    { id: 'dashboard', label: 'Dashboard' },
  ];
  return (
    <nav className="th-nav">
      <div className="th-nav-inner">
        <a className="th-brand" onClick={() => onNavigate('home')}>Tutor House</a>
        <div className="th-nav-menu">
          {items.map(it => (
            <a key={it.id}
               className={"th-nav-link" + (route === it.id ? " active" : "")}
               onClick={() => onNavigate(it.id)}>
              {it.label}
            </a>
          ))}
        </div>
        <div className="th-nav-actions">
          <button className="th-btn th-btn-outline th-btn-sm" onClick={onLogin}>Login</button>
          <button className="th-btn th-btn-primary th-btn-sm" onClick={onSignup}>Sign up</button>
        </div>
      </div>
    </nav>
  );
}
window.Navbar = Navbar;
