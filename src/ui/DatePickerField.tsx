import DatePicker, { Value } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

interface DatePickerField {
  date: Value;
  label: string;
  setDate: React.Dispatch<React.SetStateAction<Value>>;
  required:boolean
}

function DatePickerField({ label, date, setDate ,required}: DatePickerField) {
  return (
    <div>
      <span className="mb-2 block text-secondary-700">{label} {required && <span className="text-error">*</span>}</span>
      <DatePicker
        containerClassName="w-full"
        inputClass="textField__input"
        calendarPosition="bottom-center"
        value={date}
        onChange={(date) => setDate(date)}
        format="YYYY/MM/DD"
        calendar={persian}
        locale={persian_fa}
      />
    </div>
  );
}
export default DatePickerField;
