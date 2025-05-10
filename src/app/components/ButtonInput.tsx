type ButtonInputProps = {
    onClick?: () => void;
    title: string;
}
const ButtonInput = ({onClick,title}:ButtonInputProps) => {
    return ( <button
        type="button"
        onClick={onClick}
        className="w-full bg-[var(--primary-color)] text-white py-2 rounded-md cursor-pointer"
      >
       {title}
      </button> );
}
 
export default ButtonInput;