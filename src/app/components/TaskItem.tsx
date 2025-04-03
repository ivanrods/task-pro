import { Circle, Star, Trash } from "lucide-react";
import Link from "next/link";

const TaskItem = () => {
  return (
    <Link href="/task">
      <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
        <Circle />
        <p className="w-full text-neutral-800">Estudar next.js</p> <Star />
        <Trash />
      </li>
    </Link>
  );
};

export default TaskItem;
