import { ChevronDown, ChevronRight } from "lucide-react";

type ToggleCompletedButtonProps = {
  toggleCompleted: boolean;
  number: number;
  onClick: () => void;
};

const ToggleCompletedButton = ({
  toggleCompleted,
  number,
  onClick,
}: ToggleCompletedButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex gap-1 text-[var(--text-color)] cursor-pointer"
    >
      <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
      <ChevronDown className={toggleCompleted ? "block" : "hidden"} />
      <p className="font-semibold">Concluídas</p> <span>{number}</span>
    </button>
  );
};

export default ToggleCompletedButton;
