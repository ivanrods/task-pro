"use client";
import { CalendarDays, Circle, FileText } from "lucide-react";
import { useState } from "react";

type AddTaskInputProps = {
  addTask: (title: string, description: string, data: string) => void;
};

const AddTaskInput = ({ addTask }: AddTaskInputProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");

  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleData, setToggleData] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  return (
    <div className=" bg-white rounded-xl shadow-lg  overflow-hidden my-4">
      <section className="flex gap-4 w-full bg-white px-4 py-4 text-blue-500 ">
        <Circle />
        <input
          placeholder="Adicioner uma tarefa"
          className="w-full border-none outline-none"
          type="text"
          value={title}
          onChange={handleChange}
          maxLength={50}
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
            maxLength={300}
          />
        </section>
      )}

      <section className="w-full py-2 px-4 bg-neutral-100 flex justify-between items-center  text-neutral-600">
        <div className="flex items-center gap-4">
          <button onClick={() => setToggleDescription(!toggleDescription)}>
            <FileText
              className={`hover:text-blue-500 cursor-pointer ${
                toggleDescription ? "text-blue-500" : "text-neutral-700"
              } `}
            />
          </button>

          <div className="flex gap-2">
            <CalendarDays
              onClick={() => setToggleData(!toggleData)}
              className={`hover:text-blue-500 cursor-pointer ${
                toggleData ? "text-blue-500" : "text-neutral-700"
              } `}
            />
            {toggleData && (
              <input className="text-blue-500 " type="date" value={data} onChange={handleData} />
            )}
          </div>
        </div>

        <button
          className="border-1 border-b-neutral-600 px-2 py-1 cursor-pointer hover:border-blue-500 hover:text-blue-500"
          onClick={() => {
            if (title.trim() === "") {
              alert("Por favor, insira um título para a tarefa.");
              return;
            }
            if (title.length > 50) {
              alert("O título deve ter no máximo 30 caracteres.");
              return;
            }

            if (description.length > 300) {
              alert("A descrição deve ter no máximo 200 caracteres.");
              return;
            }
            addTask(title, description, data);
            setTitle("");
            setDescription("");
            setToggleDescription(false);
            setData("");
            setToggleData(false);
          }}
        >
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default AddTaskInput;
