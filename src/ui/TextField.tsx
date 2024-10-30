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

type TextField<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validationSchema?: ValidationSchema;
  errors?: FieldErrors<T>;
  type?: string;
};

function TextField<T extends FieldValues>({
  label,
  name,
  register,
  validationSchema,
  type = "text",
  errors,
}: TextField<T>) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-secondary-700">
        {label}{" "}
        {validationSchema?.required && <span className="text-error">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        id={name}
        className="textField__input"
        type={type}
        autoComplete="off"
      />
      {errors && errors[name] && (
        <span className="text-error block text-sm mt-2">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
}
export default TextField;
