import { Bell, CalendarDays, Circle } from "lucide-react";

const AddTaskInput = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg mb-4 overflow-hidden">
      <div className="flex gap-4 w-full bg-white px-4 py-4 text-blue-500 ">
        <Circle />
        <input
          placeholder="Adicioner uma tarefa"
          className="w-full border-none outline-none"
        />
      </div>

      <div className="w-full py-2 px-4 bg-neutral-100 flex justify-between items-center  text-neutral-600">
        <div className="flex gap-4 ">
          <Bell />
          <CalendarDays />
        </div>
        <button className="border-1 border-b-neutral-600 px-2 py-1">
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default AddTaskInput;
