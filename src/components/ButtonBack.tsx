import { ArrowLeft } from "lucide-react";

type buttonBackProps = {
  onClick: () => void;
};

const ButtonBack = ({ onClick }: buttonBackProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className=" text-[var(--text-color)] flex items-center gap-2 max-w-min cursor-pointer hover:text-[var(--primary-color)]"
    >
      <ArrowLeft /> Voltar
    </button>
  );
};

export default ButtonBack;
