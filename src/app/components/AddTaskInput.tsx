"use client";
import { Bell, CalendarDays, Circle } from "lucide-react";
import { useState } from "react";

type AddTaskInputProps = {
  addTask: (task: string) => void;
};

const AddTaskInput = ({ addTask }: AddTaskInputProps) => {
  const [title, setTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  return (
    <div className="w-full bg-white rounded-xl shadow-lg mb-4 overflow-hidden">
      <section className="flex gap-4 w-full bg-white px-4 py-4 text-blue-500 ">
        <Circle />
        <input
          placeholder="Adicioner uma tarefa"
          className="w-full border-none outline-none"
          type="text"
          value={title}
          onChange={handleChange}
        />
      </section>

      <section className="w-full py-2 px-4 bg-neutral-100 flex justify-between items-center  text-neutral-600">
        <div className="flex items-center gap-4">
          <button className="hover:text-blue-500">
            <Bell />
          </button>

          <div className="relative w-8 h-8 flex items-center justify-center hover:text-blue-500 cursor-pointer">
            <input
              type="date"
              className="absolute inset-0 w-full h-full opacity-1 cursor-pointer z-1"
            />
            <CalendarDays className="w-6 h-6 text-gray-600 " />
          </div>
        </div>

        <button
          className="border-1 border-b-neutral-600 px-2 py-1 cursor-pointer hover:border-blue-500 hover:text-blue-500"
          onClick={() => addTask(title)}
        >
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default AddTaskInput;
