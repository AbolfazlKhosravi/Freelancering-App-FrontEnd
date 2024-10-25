interface TypeChildred {
  children: React.ReactNode;
}
function Table({ children }: TypeChildred) {
  return (
    <div className="bg-secondary-0 overflow-x-auto">
      <table>{children}</table>
    </div>
  );
}
export default Table;

function TableHeader({ children }: TypeChildred) {
  return (
    <thead>
      <tr className="title-row">{children}</tr>
    </thead>
  );
}

function TableBody({ children }: TypeChildred) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children }: TypeChildred) {
  return <tr>{children}</tr>;
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
