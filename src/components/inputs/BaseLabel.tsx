type Props = {
  baseStyle?: string;
  htmlFor: string;
  helpDescription?: string;
  label: string;
};

export default function BaseLabel({
  baseStyle = "label-primary",
  htmlFor,
  helpDescription,
  label,
}: Props) {
  return (
    <label
      htmlFor={htmlFor}
      className={`flex justify-between align-middle ${baseStyle}`}
    >
      <slot name="default">
        <div>
          {label}
          {helpDescription && (
            <p title="helpDescription" className="hint">
              {helpDescription}
            </p>
          )}
        </div>
      </slot>
    </label>
  );
}
