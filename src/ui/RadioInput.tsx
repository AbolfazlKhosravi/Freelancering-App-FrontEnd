import { FieldValues, Path, UseFormRegister, UseFormWatch } from "react-hook-form";

type ValidationSchema = {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};
interface TypeInputRedioInput<T extends FieldValues> {
  label:string,
  value:number,
  name:Path<T>,
  id:string,
  validationSchema:ValidationSchema
  watch:UseFormWatch<T>
  register: UseFormRegister<T>;
}


function RadioInput<T extends FieldValues>({
  label,
  value,
  name,
  id,
  validationSchema,
  watch,
  register,
}:TypeInputRedioInput<T>) {
  return (
    <div className="flex items-center gap-x-2 text-secondary-600">
      <input
        className="cursor-pointer w-4 h-4 form-radio text-primary-900 focus:ring-primary-900 focus:ring-1"
        type="radio"
        id={id}
        value={value}
        {...register(name, validationSchema)}
        checked={watch(name) === value}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default RadioInput;
