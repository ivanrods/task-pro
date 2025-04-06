"use client";
import { Circle, Star, Trash } from "lucide-react";
import { useTask } from "../context/TaskContext";
import Link from "next/link";


type TaskItemProps = {
  title: string;
};

const TaskItem = ({ title }: TaskItemProps) => {
 
  const { toggleCheckedItem, toggleCheckedFavorite, fillColorFavorite, fillColorItem, checkedItem} = useTask();
  return (
    <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
      <button onClick={toggleCheckedItem}>
        <Circle fill={fillColorItem} />
      </button>
      <Link href="/task" className="w-full">
        <p className={`text-neutral-800 ${checkedItem ? 'line-through': ''} `}>{title}</p>
      </Link>
      <button onClick={toggleCheckedFavorite}>
        <Star fill={fillColorFavorite} />
      </button>

      <button className="hover:text-red-500">
        <Trash />
      </button>
    </li>
  );
};

export default TaskItem;
