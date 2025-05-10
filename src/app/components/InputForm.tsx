import { ChangeEvent } from "react";

type InputFormProps = {
  type: "text" | "date" | "textarea" | "password" | "email";
  id: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label?: string;
};

const InputForm = ({
  type,
  id,
  value,
  placeholder,
  onChange,
  maxLength,
  label,
}: InputFormProps) => {
  return (
    <label htmlFor={id} className="text-[var(--text-color)] flex flex-col gap-2 overflow-hidden w-full">
      {label}

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className="bg-[var(--background)] px-4 py-4 rounded-lg text-[var(--text-color)] border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] w-full h-40 resize-none"
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className="bg-[var(--background)] px-4 py-4 rounded-lg text-[var(--text-color)] border border-[var(--border-color)] outline-none focus:border-[var(--primary-color)] w-full "
        />
        
      )}
    </label>
    
  );
};

export default InputForm;
