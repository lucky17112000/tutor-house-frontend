// TutorDetail — hero image header + booking card on right
function TutorDetail({ tutor, onBack, onConfirm }) {
  const [selectedDay, setSelectedDay] = React.useState('Monday');
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const availability = {
    Monday: ['09:00-10:00', '14:00-15:00', '16:00-17:00'],
    Wednesday: ['10:00-11:00', '15:00-16:00'],
    Saturday: ['09:00-10:00', '11:00-12:00', '14:00-15:00'],
  };
  const days = Object.keys(availability);

  return (
    <section className="th-section">
      <div className="th-container">
        <a className="th-back" onClick={onBack}>← Back to tutors</a>
        <div className="th-detail-grid">
          <div>
            <div className="th-detail-hero">
              <img src={tutor.image} alt={tutor.name} />
              <div className="th-detail-overlay" />
              <div className="th-detail-name">
                <h1>{tutor.name}</h1>
                <span className="th-pill-out">{tutor.category}</span>
              </div>
              <div className="th-tutor-price">${tutor.hourlyRate}/hr</div>
            </div>
            <div className="th-detail-stats">
              <div className="th-detail-stat"><div className="num">{tutor.rating.toFixed(1)}★</div><div className="lbl">Rating</div></div>
              <div className="th-detail-stat"><div className="num">12+</div><div className="lbl">Years</div></div>
              <div className="th-detail-stat"><div className="num">340</div><div className="lbl">Sessions</div></div>
              <div className="th-detail-stat"><div className="num">98%</div><div className="lbl">Repeat</div></div>
            </div>
            <h3 className="th-detail-h3">About</h3>
            <p className="th-detail-body">{tutor.bio} Sessions are interactive, problem-driven, and tailored to where you are. Whether you're catching up or pushing ahead, we'll build the path together.</p>
            <h3 className="th-detail-h3">Subjects</h3>
            <div className="th-chip-row">
              <span className="th-pill-out">Algebra</span>
              <span className="th-pill-out">Calculus</span>
              <span className="th-pill-out">SAT Prep</span>
              <span className="th-pill-out">Geometry</span>
            </div>
          </div>

          <div className="th-booking-card">
            <div className="th-booking-banner">
              <div className="th-booking-icon">📅</div>
              <div className="title">Book a session</div>
              <div className="sub">Pick a day & time that works for you</div>
            </div>
            <div className="th-booking-body">
              <div className="th-booking-step">
                <div className="step-label">📆 Available days</div>
                <div className="th-day-row">
                  {days.map(d => (
                    <button key={d}
                            className={"th-day" + (selectedDay === d ? " active" : "")}
                            onClick={() => { setSelectedDay(d); setSelectedSlot(null); }}>
                      <div className="d">{d}</div>
                      <div className="dt">Next {d.slice(0,3)}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="th-booking-step">
                <div className="step-label">🕐 Time slots ({selectedDay})</div>
                <div className="th-slot-grid">
                  {availability[selectedDay].map((slot, i) => {
                    const [s, e] = slot.split('-');
                    return (
                      <button key={i}
                              className={"th-slot" + (selectedSlot === slot ? " active" : "")}
                              onClick={() => setSelectedSlot(slot)}>
                        {selectedSlot === slot && <span className="check">✓</span>}
                        <span className="lbl2">Start</span><span className="t">{s}</span>
                        <span className="arrow">▼</span>
                        <span className="lbl2">End</span><span className="t">{e}</span>
                        <span className="tag">${tutor.hourlyRate}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              {selectedSlot && (
                <div className="th-booking-summary">
                  <div className="summary-title">📋 Booking summary</div>
                  <div className="row"><span>📆 Day</span><b>{selectedDay}</b></div>
                  <div className="row"><span>🕐 Time</span><b>{selectedSlot}</b></div>
                  <div className="row"><span>💰 Price</span><b className="price">${tutor.hourlyRate}</b></div>
                </div>
              )}
              <button className="th-btn th-btn-cta th-btn-block"
                      disabled={!selectedSlot}
                      onClick={() => onConfirm(tutor, selectedDay, selectedSlot)}>
                ✅ Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
window.TutorDetail = TutorDetail;
