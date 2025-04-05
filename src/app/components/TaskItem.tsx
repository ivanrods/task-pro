import { Circle, Star, Trash } from "lucide-react";
import Link from "next/link";

type TaskItemProps = {
  title: string;
};

const TaskItem = ({ title }: TaskItemProps) => {
  return (
    <Link href="/task">
      <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
        <button>
          <Circle />
        </button>
        <p className="w-full text-neutral-800">{title}</p>
        <button>
          <Star />
        </button>

        <button>
          <Trash />
        </button>
      </li>
    </Link>
  );
};

export default TaskItem;
