import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputFormProps = {
  type: "text" | "date" | "textarea" | "password" | "email";
  label?: string;
  error?: string;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

const InputForm = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFormProps
>(({ type, id, label, error, ...rest }, ref) => {
  return (
    <fieldset className="group text-[var(--text-color)] px-4  pb-2 w-full border border-[var(--border-color)] focus-within:border-[var(--primary-color)] focus-within:border-2 rounded-md">
      <legend className=" px-2 group-focus-within:text-[var(--primary-color)] text-sm">
        <label htmlFor={id}>{label}</label>
      </legend>
      {type === "textarea" ? (
        <textarea
          id={id}
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className="border-0 outline-0 text-[var(--text-color)]  w-full h-40 resize-none"
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          type={type}
          ref={ref as React.Ref<HTMLInputElement>}
          className={`placeholder:text-sm w-full outline-0 border-0 py-2 text-[var(--text-color)] ${
            error ? "placeholder-[var(--alert-color)]" : ""
          }`}
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          placeholder={error || rest.placeholder}
        />
      )}
    </fieldset>
  );
});

InputForm.displayName = "InputForm";

export default InputForm;
