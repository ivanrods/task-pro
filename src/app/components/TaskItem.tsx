"use client";
import { Circle, Star, Trash } from "lucide-react";
import { useTask } from "../context/TaskContext";
import Link from "next/link";

type TaskItemProps = {
  id: string;
  title: string;
  completed: boolean;
  favorite: boolean;
};

const TaskItem = ({ id, title, favorite, completed }: TaskItemProps) => {
  const { toggleCompleted, toggleFavorite, deleteTask } = useTask();
  return (
    <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
      <button className="cursor-pointer " onClick={() => toggleCompleted(id)}>
        <Circle fill={completed ? "#3b82f6" : "none"} />
      </button>
      <Link href={`/task/${id}`} className="w-full">
        <p className={`text-neutral-800 ${completed ? "line-through" : ""} break-words`}>
          {title}
        </p>
      </Link>
      <button className="cursor-pointer " onClick={() => toggleFavorite(id)}>
        <Star fill={favorite ? "#3b82f6" : "none"} />
      </button>

      <button
        className="cursor-pointer hover:text-red-500"
        onClick={() => deleteTask(id)}
      >
        <Trash />
      </button>
    </li>
  );
};

export default TaskItem;
