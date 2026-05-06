// TutorList page — eyebrow + heading + filter chips + grid
function TutorList({ tutors, onView }) {
  const [active, setActive] = React.useState('All');
  const cats = ['All', 'Math', 'Science', 'Languages', 'Test Prep', 'Music'];
  const filtered = active === 'All' ? tutors : tutors.filter(t => t.category === active);
  return (
    <section className="th-section">
      <div className="th-container">
        <div className="th-eyebrow"><span className="th-eyebrow-dot"></span>Browse Tutors</div>
        <h2 className="th-h2">Find your <span className="th-grad-text">perfect match</span></h2>
        <p className="th-section-sub">500+ vetted experts across 200+ subjects. Filter by what you want to learn.</p>
        <div className="th-chip-row">
          {cats.map(c => (
            <button key={c}
                    className={"th-chip" + (active === c ? " active" : "")}
                    onClick={() => setActive(c)}>{c}</button>
          ))}
        </div>
        <div className="th-tutor-grid">
          {filtered.map(t => <TutorCard key={t.id} tutor={t} onView={onView} />)}
        </div>
      </div>
    </section>
  );
}
window.TutorList = TutorList;
