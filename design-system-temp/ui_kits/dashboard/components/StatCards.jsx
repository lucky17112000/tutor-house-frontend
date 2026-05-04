// StatCards — 4 KPIs at top of admin/tutor overview
function StatCards({ stats }) {
  return (
    <div className="th-stat-cards">
      {stats.map((s, i) => (
        <div className="th-stat-card" key={i}>
          <div className={"th-stat-card-ic g" + ((i % 4) + 1)}>{s.icon}</div>
          <div className="th-stat-card-num">{s.num}</div>
          <div className="th-stat-card-lbl">{s.label}</div>
          <div className={"th-stat-card-delta " + (s.delta > 0 ? 'up' : 'down')}>
            {s.delta > 0 ? '↑' : '↓'} {Math.abs(s.delta)}%
            <span> vs last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
window.StatCards = StatCards;
