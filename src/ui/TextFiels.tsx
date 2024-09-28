interface TextFielsType {
  label: string;
  name: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}
function TextFiels({ label, name, value, onChange }: TextFielsType) {
  return (
    <div>
      <label htmlFor={name} className="mb-1">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        className="textField__input"
        type="text"
        name={name}
        autoComplete="off"
      />
    </div>
  );
}
export default TextFiels;
