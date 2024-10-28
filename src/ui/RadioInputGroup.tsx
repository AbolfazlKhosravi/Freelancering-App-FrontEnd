import { FieldErrors, FieldValues, Path, UseFormRegister, UseFormWatch } from "react-hook-form";
import RadioInput from "./RadioInput";

type ValidationSchema = {
  required?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};

interface RadioInputGroup<T extends FieldValues> {
  errors:FieldErrors<T>
  register:UseFormRegister<T>
  watch:UseFormWatch<T>
  configs:{
    name: Path<T>,
    validationSchema: ValidationSchema,
    options: {value: number,label:string}[]
  }
}

function RadioInputGroup<T extends FieldValues>({ register, watch, errors, configs }:RadioInputGroup<T>) {
  const { name, validationSchema = {}, options } = configs;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-x-8">
        {options.map(({ label, value }) => (
          <RadioInput<T>
            key={value}
            label={label}
            value={value}
            id={String(value)}
            name={name}
            register={register}
            watch={watch}
            validationSchema={validationSchema}
          />
        ))}
      </div>
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2 flex-1">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
export default RadioInputGroup;
