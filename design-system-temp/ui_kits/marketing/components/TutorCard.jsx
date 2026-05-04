// TutorCard — image, price badge, name, bio, rating, CTA
function TutorCard({ tutor, onView }) {
  const full = Math.floor(tutor.rating);
  const half = (tutor.rating % 1) >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return (
    <div className="th-tutor-card" onClick={() => onView && onView(tutor)}>
      <div className="th-tutor-img-wrap">
        <img src={tutor.image} alt={tutor.name} className="th-tutor-img" />
        <div className="th-tutor-price">${tutor.hourlyRate}/hr</div>
      </div>
      <div className="th-tutor-body">
        <h3 className="th-tutor-name">{tutor.name}</h3>
        <p className="th-tutor-bio">{tutor.bio}</p>
        <div className="th-tutor-divider" />
        <div className="th-tutor-row">
          <div className="th-stars">
            {Array.from({length: full}).map((_,i) => <span key={'f'+i}>★</span>)}
            {half && <span className="half">★</span>}
            {Array.from({length: empty}).map((_,i) => <span key={'e'+i} className="empty">★</span>)}
            <span className="th-rating-num">{tutor.rating.toFixed(1)}</span>
          </div>
          <a className="th-link" onClick={(e) => { e.stopPropagation(); onView && onView(tutor); }}>View Details →</a>
        </div>
      </div>
    </div>
  );
}
window.TutorCard = TutorCard;
