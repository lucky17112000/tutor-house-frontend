// BookingRow — list row for student/tutor "My Bookings" view
function BookingRow({ booking, onCancel, onJoin }) {
  const statusClass = {
    upcoming: 'success',
    pending: 'warn',
    completed: 'outline',
    cancelled: 'danger',
  }[booking.status];
  return (
    <div className="th-booking-row">
      <img src={booking.image} alt="" className="th-booking-row-img" />
      <div className="th-booking-row-meta">
        <div className="name">{booking.with}</div>
        <div className="sub">{booking.subject}</div>
      </div>
      <div className="th-booking-row-when">
        <div className="when-d">{booking.day}</div>
        <div className="when-t">{booking.time}</div>
      </div>
      <span className={"th-pill " + statusClass}>{booking.status}</span>
      <div className="th-booking-row-price">${booking.price}</div>
      <div className="th-booking-row-actions">
        {booking.status === 'upcoming' && (
          <>
            <button className="th-btn th-btn-cta th-btn-sm" onClick={() => onJoin && onJoin(booking)}>Join</button>
            <button className="th-btn th-btn-outline th-btn-sm" onClick={() => onCancel && onCancel(booking)}>Cancel</button>
          </>
        )}
        {booking.status === 'pending' && (
          <>
            <button className="th-btn th-btn-cta th-btn-sm">Approve</button>
            <button className="th-btn th-btn-outline th-btn-sm">Decline</button>
          </>
        )}
        {booking.status === 'completed' && <button className="th-btn th-btn-outline th-btn-sm">Rate</button>}
      </div>
    </div>
  );
}
window.BookingRow = BookingRow;
