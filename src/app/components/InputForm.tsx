import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type InputFormProps = {
  type: "text" | "date" | "textarea" | "password" | "email";
  label?: string;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);

const InputForm = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFormProps
>(({ type, id, label, ...rest }, ref) => {
  return (
    <fieldset className="group text-[var(--text-color)] px-4 py-2 pb-4 w-full border border-[var(--border-color)] focus-within:border-[var(--primary-color)] ">
      <legend className=" px-2 group-focus-within:text-[var(--primary-color)]">
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
          className=" border-0 outline-0 text-[var(--text-color)] w-full"
          {...(rest as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
    </fieldset>
  );
});

InputForm.displayName = "InputForm";

export default InputForm;
