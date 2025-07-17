import { ArrowLeft } from "lucide-react";

type buttonBackProps = {
    onClick: () => void
}

const ButtonBack = ({onClick}: buttonBackProps) => {
    return ( <button
        type="button"
        onClick={onClick}
        className="fixed top-8 left-8 text-[var(--text-color)] flex items-center gap-2 my-8 cursor-pointer hover:text-[var(--primary-color)]"
      >
        <ArrowLeft /> Voltar
      </button> );
}
 
export default ButtonBack;