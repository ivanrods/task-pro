type ButtonInputProps = {
  onClick?: () => void;
  title: string;
  variant: "save" | "delete";
};
const ButtonInput = ({ onClick, title, variant }: ButtonInputProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      data-variant={variant}
      className="py-2 rounded-md cursor-pointer w-full 
      data-[variant=save]:bg-[var(--primary-color)] 
      data-[variant=save]:text-white 
      data-[variant=delete]:border 
      data-[variant=delete]:hover:text-[var(--alert-color)] 
      data-[variant=delete]:text-[var(--primary-color)]"
    >
      {title}
    </button>
  );
};

export default ButtonInput;
