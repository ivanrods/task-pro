"use client";
import { useParams } from "next/navigation";
import { useTask } from "../../context/TaskContext";
import { Circle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function TaskDetail() {
  const router = useRouter();
  const { task } = useParams<{ task: string }>();
  const { tasks, toggleCompleted, toggleFavorite, deleteTask } = useTask();
  const taskDetail = tasks.find((t) => t.id === task);

  const [title, setTitle] = useState(taskDetail?.title || "");
  const [description, setDescription] = useState(taskDetail?.description || "");

  console.log(taskDetail);
  return (
    <form>
      <fieldset className="w-full py-4 flex justify-center flex-col gap-6 md:px-6">
        <legend className="text-2xl font-bold mb-4">{title}</legend>
        <label htmlFor="title" className="flex flex-col gap-2">
          Titulo da tarefa:
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white px-4 py-4 rounded-lg text-neutral-700 border-none outline-none"
          />
        </label>
        <label htmlFor="description" className="flex flex-col gap-2">
          Descrição da tarefa:
          <textarea
            name=""
            id="description"
            placeholder="Adicione uma descrição"
            className="bg-white px-4 py-4 rounded-lg text-neutral-700 border-none outline-none h-52"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label htmlFor="date" className="flex flex-col gap-2">
          Data da tarefa:
          <input
            type="date"
            name=""
            id="date"
            className="bg-white px-4 py-4 rounded-lg text-neutral-700 border-none outline-none"
          />
        </label>

        <div className="w-full flex flex-col gap-4 text-blue-500">
          <button
            type="button"
            onClick={() => taskDetail && toggleCompleted(taskDetail.id)}
            className="flex gap-2 "
          >
            <Circle fill={taskDetail?.completed ? "#3b82f6" : "none"} />{" "}
            Concluído
          </button>
          <button
            type="button"
            onClick={() => taskDetail && toggleFavorite(taskDetail.id)}
            className="flex gap-2 "
          >
            <Star fill={taskDetail?.favorite ? "#3b82f6" : "none"} /> Favoritar
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();

              console.log("Salvar clicado");
            }}
            className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={() => {
              if (taskDetail) {
                deleteTask(taskDetail.id);
                router.back();
              }
            }}
            className="w-full text-blue-500 border py-2 rounded-md cursor-pointer"
          >
            Excluir
          </button>
        </div>
      </fieldset>
    </form>
  );
}
