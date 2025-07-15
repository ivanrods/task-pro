import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

type InputFormProps = {
  type: "text" | "date" | "textarea" | "password" | "email";
  label?: string;
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
);


const InputForm = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputFormProps>(
  ({ type, id, label, ...rest }, ref) => {
    return (
      <label
        htmlFor={id}
        className="text-[var(--text-color)] flex flex-col gap-2 overflow-hidden w-full"
      >
        {label}
        {type === "textarea" ? (
          <textarea
            id={id}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className="bg-[var(--background)] px-4 py-4 rounded-lg text-[var(--text-color)] border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] w-full h-40 resize-none"
            {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={id}
            type={type}
            ref={ref as React.Ref<HTMLInputElement>}
            className="bg-[var(--background)] px-4 py-4 rounded-lg text-[var(--text-color)] border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] w-full"
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </label>
    );
  }
);

InputForm.displayName = "InputForm"; 

export default InputForm;
