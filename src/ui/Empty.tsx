interface Empty {
  resourceName :string
}
function Empty({ resourceName }:Empty) {
  return (
    <p className="font-bold text-secondary-700"> {resourceName} یافت نشد.</p>
  );
}
export default Empty;
