// Charts.jsx — animated bar chart, donut, progress bars, quick insights
// All animations are CSS-driven and trigger when the component mounts.

function useMounted(delay = 60) {
  const [m, setM] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setM(true), delay);
    return () => clearTimeout(t);
  }, []);
  return m;
}

/* ============================================================
   BarChart — vertical animated bars
   props: title, sub, data: [{ label, value, accent? }], maxY
   ============================================================ */
function BarChart({ title, sub, data, footer }) {
  const mounted = useMounted();
  const max = Math.max(...data.map(d => d.value));
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(t => Math.round(max * t));

  const [hover, setHover] = React.useState(null);

  return (
    <div className="th-chart-card">
      <div className="th-chart-head">
        <div>
          <h3>{title}</h3>
          {sub && <p>{sub}</p>}
        </div>
        <div className="th-chart-legend">
          <span><i style={{ background: '#1d4ed8' }}></i>Sessions</span>
          <span><i style={{ background: '#0a0a0a' }}></i>Earnings</span>
        </div>
      </div>

      <div className="th-bar-wrap">
        {/* Y axis */}
        <div className="th-bar-yaxis">
          {yTicks.slice().reverse().map((t, i) => (
            <div key={i} className="th-bar-ytick"><span>{t}</span></div>
          ))}
        </div>

        <div className="th-bar-grid">
          {/* horizontal grid lines */}
          {yTicks.map((_, i) => <div key={i} className="th-bar-gridline" />)}

          {/* bars */}
          <div className="th-bar-bars">
            {data.map((d, i) => {
              const h = mounted ? (d.value / max) * 100 : 0;
              const isHover = hover === i;
              return (
                <div
                  key={i}
                  className={"th-bar-col" + (isHover ? " hover" : "")}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                >
                  {isHover && (
                    <div className="th-bar-tooltip">
                      <div className="v">{d.value}</div>
                      <div className="l">sessions</div>
                    </div>
                  )}
                  <div className="th-bar-stack">
                    <div
                      className="th-bar-bar primary"
                      style={{
                        height: `${h}%`,
                        transitionDelay: `${i * 70}ms`,
                      }}
                    />
                    <div
                      className="th-bar-bar dark"
                      style={{
                        height: `${h * 0.55}%`,
                        transitionDelay: `${i * 70 + 40}ms`,
                      }}
                    />
                  </div>
                  <div className="th-bar-lbl">{d.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {footer && <div className="th-chart-foot">{footer}</div>}
    </div>
  );
}

/* ============================================================
   DonutChart — animated SVG donut
   props: title, sub, segments: [{ label, value, color }]
   ============================================================ */
function DonutChart({ title, sub, segments }) {
  const mounted = useMounted();
  const total = segments.reduce((s, x) => s + x.value, 0);
  const R = 64;
  const C = 2 * Math.PI * R;

  const [active, setActive] = React.useState(0);

  // build cumulative offsets
  let cum = 0;
  const arcs = segments.map(s => {
    const frac = s.value / total;
    const dash = mounted ? frac * C : 0;
    const offset = -cum * C;
    cum += frac;
    return { ...s, dash, offset, frac };
  });

  return (
    <div className="th-chart-card">
      <div className="th-chart-head">
        <div>
          <h3>{title}</h3>
          {sub && <p>{sub}</p>}
        </div>
      </div>

      <div className="th-donut-wrap">
        <div className="th-donut-svg-wrap">
          <svg viewBox="0 0 160 160" className="th-donut-svg">
            <circle cx="80" cy="80" r={R} fill="none" stroke="#f4f4f5" strokeWidth="20" />
            {arcs.map((a, i) => (
              <circle
                key={i}
                cx="80" cy="80" r={R}
                fill="none"
                stroke={a.color}
                strokeWidth={active === i ? 22 : 20}
                strokeDasharray={`${a.dash} ${C}`}
                strokeDashoffset={a.offset}
                strokeLinecap="butt"
                transform="rotate(-90 80 80)"
                style={{
                  transition: 'stroke-dasharray .9s cubic-bezier(.2,.8,.2,1), stroke-width .25s',
                  transitionDelay: `${i * 110}ms`,
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setActive(i)}
              />
            ))}
            <text x="80" y="74" textAnchor="middle" fill="#0a0a0a" style={{ font: '700 22px var(--font-sans)' }}>
              {Math.round(arcs[active].frac * 100)}%
            </text>
            <text x="80" y="94" textAnchor="middle" fill="#71717a" style={{ font: '500 11px var(--font-sans)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
              {arcs[active].label}
            </text>
          </svg>
        </div>

        <div className="th-donut-legend">
          {segments.map((s, i) => (
            <div
              key={i}
              className={"th-donut-leg" + (active === i ? " active" : "")}
              onMouseEnter={() => setActive(i)}
            >
              <i style={{ background: s.color }} />
              <div className="th-donut-leg-meta">
                <div className="lbl">{s.label}</div>
                <div className="num">{s.value.toLocaleString()}</div>
              </div>
              <div className="pct">{Math.round((s.value / total) * 100)}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ProgressList — animated horizontal progress rows
   props: title, sub, items: [{ label, value, max, accent? }]
   ============================================================ */
function ProgressList({ title, sub, items }) {
  const mounted = useMounted();
  return (
    <div className="th-chart-card">
      <div className="th-chart-head">
        <div>
          <h3>{title}</h3>
          {sub && <p>{sub}</p>}
        </div>
      </div>

      <div className="th-prog-list">
        {items.map((it, i) => {
          const pct = (it.value / it.max) * 100;
          return (
            <div className="th-prog-row" key={i}>
              <div className="th-prog-row-h">
                <span className="th-prog-lbl">{it.label}</span>
                <span className="th-prog-num">
                  <strong>{it.value.toLocaleString()}</strong>
                  <span> / {it.max.toLocaleString()}</span>
                </span>
              </div>
              <div className="th-prog-track">
                <div
                  className="th-prog-fill"
                  style={{
                    width: mounted ? `${pct}%` : '0%',
                    transitionDelay: `${i * 90}ms`,
                    background: it.accent || 'linear-gradient(90deg, #1d4ed8, #2563eb)',
                  }}
                >
                  <span className="th-prog-shine" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   QuickInsights — small animated tiles
   props: title, items: [{ icon, label, value, trend, sparkline? }]
   ============================================================ */
function QuickInsights({ items }) {
  return (
    <div className="th-insight-grid">
      {items.map((it, i) => (
        <div className="th-insight" key={i} style={{ animationDelay: `${i * 80}ms` }}>
          <div className="th-insight-h">
            <span className={"th-insight-ic " + (it.tone || 'blue')}>{it.icon}</span>
            <span className={"th-insight-trend " + (it.trend > 0 ? 'up' : 'down')}>
              {it.trend > 0 ? '↑' : '↓'} {Math.abs(it.trend)}%
            </span>
          </div>
          <div className="th-insight-num">
            <CountUp to={it.value} prefix={it.prefix} suffix={it.suffix} />
          </div>
          <div className="th-insight-lbl">{it.label}</div>
          {it.spark && <Sparkline points={it.spark} />}
        </div>
      ))}
    </div>
  );
}

/* CountUp — animates a number from 0 to target */
function CountUp({ to, prefix = '', suffix = '', dur = 1100 }) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur);
      // easeOutCubic
      const e = 1 - Math.pow(1 - t, 3);
      setN(to * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  const formatted = to >= 1000
    ? n.toLocaleString(undefined, { maximumFractionDigits: 0 })
    : n.toFixed(to % 1 ? 2 : 0);
  return <span>{prefix}{formatted}{suffix}</span>;
}

/* Sparkline — tiny line chart */
function Sparkline({ points }) {
  const w = 100, h = 28;
  const max = Math.max(...points), min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  const path = points
    .map((p, i) => {
      const x = i * step;
      const y = h - ((p - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg className="th-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkfill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill="url(#sparkfill)" />
      <path d={path} fill="none" stroke="#1d4ed8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

window.BarChart = BarChart;
window.DonutChart = DonutChart;
window.ProgressList = ProgressList;
window.QuickInsights = QuickInsights;
