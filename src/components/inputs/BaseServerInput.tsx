import { type ComponentType } from "react";
import BaseLabel from "./BaseLabel";
import clsx from "clsx";

type Props = {
  id: string;
  disabled?: boolean;
  errors?: string[];
  label?: string;
  placeholder?: string;
  required?: boolean;
  Icon?: ComponentType<{ className?: string }>;
  type: string;
};

export default function BaseServerInput({
  id,
  disabled,
  errors,
  label,
  placeholder = "Enter text",
  required,
  Icon,
  type,
}: Props) {
  return (
    <div>
      {label && <BaseLabel htmlFor={id} label={label} />}
      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            {<Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          </div>
        )}
        <input
          id={id}
          name={id}
          className={clsx(
            "input-base",
            Icon && "icon",
            errors === undefined && "primary",
            errors !== undefined && "error",
          )}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          aria-describedby={`${id}-error`}
        />
      </div>

      {errors && (
        <div
          id={`${id}-error`}
          aria-live="polite"
          aria-atomic="true"
          v-if="errors"
        >
          {errors.map((index, error) => (
            <p className="mt-2 text-sm text-red-500" key={index}>
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
