"use client";
import { CalendarDays, Circle, FileText } from "lucide-react";
import { useState } from "react";
import { useTask } from "../context/TaskContext";
import { useStatusBar } from "../context/StatusBarContext";

type AddTaskInputProps = {
  addTask: (title: string, description: string, data: string) => void;
};

const AddTaskInput = ({ addTask }: AddTaskInputProps) => {
  const { tasks } = useTask();
  const { showStatusBar } = useStatusBar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");

  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleData, setToggleData] = useState(false);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescription = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData(event.target.value);
  };

  function handleAddTask() {
    const taskExists = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (taskExists) {
      showStatusBar("Já existe uma tarefa com esse título.", "red");
      return;
    }

    if (title.trim() === "") {
      showStatusBar("Por favor, insira um título para a tarefa.", "red");
      return;
    }
    if (title.length > 50) {
      showStatusBar("O título deve ter no máximo 30 caracteres.", "red");
      return;
    }

    if (description.length > 300) {
      showStatusBar("A descrição deve ter no máximo 200 caracteres.", "red");

      return;
    }

    addTask(title, description, data);
    setTitle("");
    setDescription("");
    setToggleDescription(false);
    setData("");
    setToggleData(false);
    showStatusBar("Tarefa criada", "blue");
  }

  return (
    <div className=" bg-[var(--background)] text-[var(--text-color)] rounded-xl shadow-lg  overflow-hidden my-4">
      <section className="flex gap-4 w-full  px-4 py-4  ">
        <Circle className="text-[var(--primary-color)]"/>
        <input
          placeholder="Adicioner uma tarefa"
          className="w-full border-none outline-none"
          type="text"
          value={title}
          onChange={handleTitle}
          maxLength={50}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
      </section>
      {toggleDescription && (
        <section className="border-t border-[var(--border-color)] flex gap-4 mx-4 py-2 ">
          <FileText className="text-[var(--primary-color)]"/>
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

      <section className="dark:bg-neutral-950 bg-neutral-100 w-full py-2 px-4  flex justify-between items-center  text-[var(--text-color)]">
        <div className="flex items-center gap-4">
          <button onClick={() => setToggleDescription(!toggleDescription)}>
            <FileText
              className={`hover:text-[var(--primary-color)] cursor-pointer ${
                toggleDescription ? "text-[var(--primary-color)]" : "text-[var(--text-color)]"
              } `}
            />
          </button>

          <div className="flex gap-2">
            <CalendarDays
              onClick={() => setToggleData(!toggleData)}
              className={`hover:text-[var(--primary-color)] cursor-pointer ${
                toggleData ? "text-[var(--primary-color)]" : "text-[var(--text-color)]"
              } `}
            />
            {toggleData && (
              <input
                className="text-[var(--text-color)]"
                type="date"
                value={data}
                onChange={handleData}
              />
            )}
          </div>
        </div>

        <button
          className="border-1 border-neutral-600 px-2 py-1 cursor-pointer hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
          onClick={handleAddTask}
        >
          Adicionar
        </button>
      </section>
    </div>
  );
};

export default AddTaskInput;
