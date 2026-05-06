// DataTable — generic table for users/tutors/categories/bookings
function DataTable({ columns, rows, actions }) {
  return (
    <div className="th-table-wrap">
      <table className="th-table">
        <thead>
          <tr>
            {columns.map(c => <th key={c.key} style={{ width: c.width }}>{c.label}</th>)}
            {actions && <th style={{ width: 100, textAlign: 'right' }}>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map(c => (
                <td key={c.key}>{c.render ? c.render(row) : row[c.key]}</td>
              ))}
              {actions && (
                <td style={{ textAlign: 'right' }}>
                  {actions.map((a, j) => (
                    <button key={j} className={"th-table-btn " + (a.variant || '')}
                            onClick={() => a.onClick && a.onClick(row)}>{a.label}</button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
window.DataTable = DataTable;
