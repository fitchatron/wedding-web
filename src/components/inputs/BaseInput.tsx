"use client";
import { type ComponentType, useEffect, useState } from "react";
import BaseLabel from "./BaseLabel";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

type Props<T extends string | number | readonly string[]> = {
  id: string;
  delay?: number; // in milliseconds
  errors?: string[];
  label?: string;
  onChange: (value: T) => void;
  placeholder?: string;
  showLeadingIcon: boolean;
  Icon?: ComponentType<{ className?: string }>;
  showClearButton: boolean;
  type: string;
  defaultValue?: T;
};

export default function BaseInput<
  T extends string | number | readonly string[],
>({
  id,
  delay = 0,
  errors,
  defaultValue = "" as T,
  label,
  onChange,
  placeholder = "Enter text",
  showLeadingIcon,
  Icon = MagnifyingGlassIcon,
  showClearButton,
  type,
}: Props<T>) {
  const [inputValue, setInputValue] = useState(defaultValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay, onChange]);

  const handleChange = (value: T) => {
    setInputValue(value);
  };

  function clearInput() {
    const EMPTY_VALUE = type == "number" ? 0 : "";
    setInputValue(EMPTY_VALUE as T);
    onChange(EMPTY_VALUE as T);
  }
  return (
    <div>
      {label && <BaseLabel htmlFor={id} label={"Search Site"} />}
      <div className="relative">
        {showLeadingIcon && (
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
            {<Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />}
          </div>
        )}
        <input
          id={id}
          className={clsx(
            "input-base",
            Icon && "icon",
            errors === undefined && "primary",
            errors !== undefined && "error",
          )}
          type={type}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value as T)}
        />
        {showClearButton && inputValue.toLocaleString().length > 0 && (
          <button
            onClick={clearInput}
            title="Clear input"
            className="absolute inset-y-0 end-0 flex items-center px-2"
          >
            <svg
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>

      {errors && (
        <div aria-live="polite" aria-atomic="true" v-if="errors">
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
