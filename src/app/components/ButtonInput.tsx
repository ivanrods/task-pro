import { Loader } from "lucide-react";

type ButtonInputProps = {
  onClick?: () => void;
  title: string;
  variant: "save" | "delete";
  type: "submit" | "button";
  load: boolean;
};
const ButtonInput = ({
  onClick,
  title,
  variant,
  type,
  load,
}: ButtonInputProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      data-variant={variant}
      className="py-2 flex justify-center items-center gap-3 rounded-md cursor-pointer w-full 
      data-[variant=save]:bg-[var(--primary-color)] 
      data-[variant=save]:hover:bg-[var(--primary-color-dark)] 
      data-[variant=save]:text-white 
      data-[variant=delete]:border 
      data-[variant=delete]:hover:text-[var(--alert-color)] 
      data-[variant=delete]:text-[var(--primary-color)]"
    >
      {title}
      {load && <Loader size={20} className="animate-spin" />}
    </button>
  );
};

export default ButtonInput;
