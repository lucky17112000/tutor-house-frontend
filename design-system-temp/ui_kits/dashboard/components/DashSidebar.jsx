// DashSidebar — sticky left sidebar with role switcher + nav + collapse toggle
function DashSidebar({ role, onChangeRole, route, onNavigate, collapsed, onToggle }) {
  const navByRole = {
    student: [
      { id: 'browse', icon: '🔍', label: 'Browse Tutors' },
      { id: 'bookings', icon: '📅', label: 'My Bookings' },
      { id: 'messages', icon: '💬', label: 'Messages', badge: 3 },
      { id: 'profile', icon: '👤', label: 'Profile' },
    ],
    tutor: [
      { id: 'overview', icon: '📊', label: 'Overview' },
      { id: 'bookings', icon: '📅', label: 'Bookings', badge: 5 },
      { id: 'availability', icon: '🕐', label: 'Availability' },
      { id: 'earnings', icon: '💰', label: 'Earnings' },
    ],
    admin: [
      { id: 'overview', icon: '📊', label: 'Overview' },
      { id: 'users', icon: '👥', label: 'Users' },
      { id: 'tutors', icon: '🎓', label: 'Tutors' },
      { id: 'categories', icon: '🏷️', label: 'Categories' },
      { id: 'bookings', icon: '📅', label: 'Bookings' },
    ],
  };
  const nav = navByRole[role];

  return (
    <aside className={"th-sidebar" + (collapsed ? " collapsed" : "")}>
      <div className="th-sidebar-top">
        <div className="th-sidebar-brand" title="Tutor House">
          <span className="th-brand-mark">T</span>
          <span className="th-brand-text">Tutor House</span>
        </div>
        <button
          className="th-sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      </div>

      {!collapsed && (
        <div className="th-role-switcher">
          <div className="th-role-label">Viewing as</div>
          <div className="th-role-tabs">
            {['student','tutor','admin'].map(r => (
              <button key={r}
                      className={"th-role-tab" + (role === r ? " active" : "")}
                      onClick={() => onChangeRole(r)}>{r[0].toUpperCase()+r.slice(1)}</button>
            ))}
          </div>
        </div>
      )}
      {collapsed && (
        <div className="th-role-switcher collapsed">
          <div className="th-role-tabs-collapsed">
            {['student','tutor','admin'].map(r => (
              <button key={r}
                      className={"th-role-tab-c" + (role === r ? " active" : "")}
                      title={r[0].toUpperCase()+r.slice(1)}
                      onClick={() => onChangeRole(r)}>{r[0].toUpperCase()}</button>
            ))}
          </div>
        </div>
      )}

      <nav className="th-side-nav">
        {!collapsed && <div className="th-side-nav-h">{role === 'admin' ? 'Manage' : 'My Account'}</div>}
        {nav.map(item => (
          <a key={item.id}
             className={"th-side-nav-item" + (route === item.id ? " active" : "")}
             onClick={() => onNavigate(item.id)}
             title={collapsed ? item.label : undefined}>
            <span className="ic">{item.icon}</span>
            <span className="lbl">{item.label}</span>
            {item.badge && <span className="badge">{item.badge}</span>}
          </a>
        ))}
      </nav>

      <div className="th-side-foot">
        <div className="th-avatar">{role === 'admin' ? 'A' : role === 'tutor' ? 'M' : 'L'}</div>
        {!collapsed && (
          <>
            <div className="th-side-foot-meta">
              <div className="name">{role === 'admin' ? 'Admin' : role === 'tutor' ? 'Marcus Chen' : 'Lily Parker'}</div>
              <div className="email">{role}@tutorhouse.app</div>
            </div>
            <button className="th-side-foot-btn">⋯</button>
          </>
        )}
      </div>
    </aside>
  );
}
window.DashSidebar = DashSidebar;
