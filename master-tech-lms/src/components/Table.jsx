// Reusable table: it only knows about "columns" and "rows".
// A column can have an optional render function for custom cells.
function Table({ columns, rows }) {
  return (
    // overflow-x-auto lets the table scroll sideways on small screens
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="bg-slate-900 text-slate-400">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-900/60">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;