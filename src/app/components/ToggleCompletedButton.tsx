import { ChevronDown, ChevronRight } from "lucide-react";

type ToggleCompletedButtonProps = {
  toggleCompleted: boolean;
  onClick: () => void;
};

const ToggleCompletedButton = ({
  toggleCompleted,
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
      Concluídos
    </button>
  );
};

export default ToggleCompletedButton;
