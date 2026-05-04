// AvailabilityEditor — tutor sets weekly slots
function AvailabilityEditor() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const hours = ['08','09','10','11','12','13','14','15','16','17','18','19','20'];
  const [grid, setGrid] = React.useState(() => {
    const g = {};
    days.forEach(d => g[d] = new Set());
    ['Mon','Wed','Fri'].forEach(d => ['10','11','14','15','16'].forEach(h => g[d].add(h)));
    g['Sat'] = new Set(['09','10','11']);
    return g;
  });

  const toggle = (d, h) => {
    const next = { ...grid };
    next[d] = new Set(grid[d]);
    if (next[d].has(h)) next[d].delete(h); else next[d].add(h);
    setGrid(next);
  };

  return (
    <div className="th-avail">
      <div className="th-avail-head">
        <div></div>
        {hours.map(h => <div key={h} className="th-avail-hr">{h}</div>)}
      </div>
      {days.map(d => (
        <div className="th-avail-row" key={d}>
          <div className="th-avail-day">{d}</div>
          {hours.map(h => (
            <button key={h}
                    className={"th-avail-cell" + (grid[d].has(h) ? " on" : "")}
                    onClick={() => toggle(d, h)} />
          ))}
        </div>
      ))}
      <div className="th-avail-foot">
        <span>Click a slot to toggle availability. Students can book any active slot.</span>
        <button className="th-btn th-btn-cta th-btn-sm">Save changes</button>
      </div>
    </div>
  );
}
window.AvailabilityEditor = AvailabilityEditor;
