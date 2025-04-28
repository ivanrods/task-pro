import { ChangeEvent } from "react";

type InputFormProps = {
  type: "text" | "date" | "textarea";
  id: string;
  value: string;
  placeholder: string;
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  label: string;
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
    <label htmlFor={id} className="flex flex-col gap-2 overflow-hidden w-full">
      {label}

      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className="bg-white px-4 py-4 rounded-lg text-neutral-700 border border-gray-200 outline-none focus:border-blue-500 w-full h-40 resize-none"
        />
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          maxLength={maxLength}
          className="bg-white px-4 py-4 rounded-lg text-neutral-700 border border-gray-200 outline-none focus:border-blue-500 w-full "
        />
      )}
    </label>
  );
};

export default InputForm;
