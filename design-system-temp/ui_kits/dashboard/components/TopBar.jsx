// TopBar — page title, search, action buttons
function TopBar({ title, subtitle, action }) {
  return (
    <header className="th-topbar">
      <div className="th-topbar-l">
        <h1 className="th-topbar-title">{title}</h1>
        {subtitle && <p className="th-topbar-sub">{subtitle}</p>}
      </div>
      <div className="th-topbar-r">
        <div className="th-search">
          <span>🔍</span>
          <input placeholder="Search…" />
          <kbd>⌘K</kbd>
        </div>
        <button className="th-icon-btn" title="Notifications">🔔<span className="dot"></span></button>
        {action}
      </div>
    </header>
  );
}
window.TopBar = TopBar;
