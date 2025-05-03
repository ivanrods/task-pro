
import { ChevronDown, ChevronRight } from "lucide-react";

type ToggleCompletedButtonProps = {
    toggleCompleted: boolean;
    onClick: () => void;
}

const ToggleCompletedButton = ({toggleCompleted, onClick}:ToggleCompletedButtonProps) => {
 
  return (
    <button onClick={onClick} className="flex gap-1 text-neutral-800 mb-4">
      <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
      <ChevronDown className={toggleCompleted ? "block" : "hidden"} />
      Concluídos
    </button>
  );
};

export default ToggleCompletedButton;
