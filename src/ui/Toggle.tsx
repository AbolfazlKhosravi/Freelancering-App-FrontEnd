import { Field, Label, Switch } from "@headlessui/react";

interface Toggle {
  label:string;
  enabled:boolean;
  onChange: () => void; 
}

function Toggle({ label, enabled, onChange }:Toggle) {
  return (
    <Field className="flex items-center justify-between gap-x-2">
      <Label>{label}</Label>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={`${
          enabled ? "bg-primary-900" : "bg-secondary-200"
        } relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none`}
      >
        <span
          className={`${
            enabled ? "-translate-x-6" : "-translate-x-1"
          } inline-block h-3 w-3 transform rounded-full bg-secondary-0 transition-transform`}
        />
      </Switch>
    </Field>
  );
}
export default Toggle;
