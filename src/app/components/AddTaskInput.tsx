"use client";
import { CalendarDays, Circle, FileText } from "lucide-react";
import { useState } from "react";

type AddTaskInputProps = {
  addTask: (title: string, description: string) => void;
};

const AddTaskInput = ({ addTask }: AddTaskInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [toggleDescription, setToggleDescription] = useState(false);

  const handleDescrition = () => {
    setToggleDescription(!toggleDescription);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div className=" bg-white rounded-xl shadow-lg  overflow-hidden mx-2 mb-2">
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
      {toggleDescription && (
        <section className="border-t border-neutral-300 flex gap-4 mx-4 py-2 text-blue-500">
          <FileText />
          <textarea
            className="w-full border-none outline-none h-20 resize-none"
            name=""
            id=""
            placeholder="Adicione uma descrição"
            value={description}
            onChange={handleDescription}
          />
        </section>
      )}

      <section className="w-full py-2 px-4 bg-neutral-100 flex justify-between items-center  text-neutral-600">
        <div className="flex items-center gap-4">
          <button onClick={handleDescrition}>
            <FileText
              className={`hover:text-blue-500 cursor-pointer ${
                toggleDescription ? "text-blue-500" : "text-neutral-700"
              } `}
            />
          </button>

          <div className="relative w-8 h-8 flex items-center justify-center hover:text-blue-500 cursor-pointer">
            <input
              type="date"
              className="absolute inset-0 w-full h-full opacity-1 cursor-pointer z-1"
            />
            <CalendarDays className=" w-6 h-6 text-gray-600 " />
          </div>
        </div>

        <button
          className="border-1 border-b-neutral-600 px-2 py-1 cursor-pointer hover:border-blue-500 hover:text-blue-500"
          onClick={() => addTask(title, description)}
        >
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default AddTaskInput;
