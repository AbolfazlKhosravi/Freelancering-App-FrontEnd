import { FieldErrors, FieldValues, Path, UseFormRegister } from "react-hook-form";

type ValidationSchema = {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?:{
    value: number,
    message: string,
  },
};

interface RHFSelect<T extends FieldValues> {
  label:string
  name:Path<T>
  register: UseFormRegister<T>
  validationSchema:ValidationSchema
  options: { label: string; value:number }[]
  required: boolean;
  errors?: FieldErrors<T>;
}

function RHFSelect<T extends FieldValues>({ label, name, register, options, required,validationSchema,errors }:RHFSelect<T>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label} {required && <span className="text-error">*</span>}
      </label>
      <select {...register(name,validationSchema)} id={name}  className="textField__input">
      <option value="">انتخاب کنید</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}

export default RHFSelect;
