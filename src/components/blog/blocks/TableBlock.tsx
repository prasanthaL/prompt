interface TableBlockProps {
  headers: string[];
  rows: string[][];
}

export default function TableBlock({ headers, rows }: TableBlockProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="bg-primary/10 border-b border-border">
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-5 py-3 font-bold text-primary uppercase tracking-wider text-xs whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className={`border-b border-border/50 last:border-0 transition-colors ${
                ri % 2 === 0 ? "bg-card/30" : "bg-card/10"
              } hover:bg-primary/5`}
            >
              {row.map((cell, ci) => (
                <td key={ci} className="px-5 py-3 text-foreground/75 leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
