import { Circle, Star } from "lucide-react";

const TaskItem = () => {
  return (
    <li className="w-full flex py-4 px-4 gap-4 mb-4 items-center bg-white rounded-xl text-blue-500 ">
      <Circle />
      <p className="w-full text-neutral-800">Estudar next.js</p> <Star />
    </li>
  );
};

export default TaskItem;
