"use client";
import { useParams } from "next/navigation";
import { useTask } from "../../context/TaskContext";
import { ArrowLeft, Circle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TaskDetail() {
  const router = useRouter();
  const { task } = useParams<{ task: string }>();
  const { tasks, deleteTask, updateTask } = useTask();
  const taskDetail = tasks.find((t) => t.id === task);

  const [title, setTitle] = useState(taskDetail?.title || "");
  const [description, setDescription] = useState(taskDetail?.description || "");

  const [completed, setCompleted] = useState(taskDetail?.completed ?? false);
  const [favorite, setFavorite] = useState(taskDetail?.favorite ?? false);

  useEffect(() => {
    if (taskDetail) {
      setTitle(taskDetail.title);
      setDescription(taskDetail.description);
      setCompleted(taskDetail.completed);
      setFavorite(taskDetail.favorite);
    }
  }, [taskDetail]);

  const handleSave = () => {
    if (taskDetail) {
      updateTask(taskDetail.id, title, description, completed, favorite);
    }
  };

  function toggleCompletedBtn() {
    setCompleted(!completed);
  }

  function toggleFavoriteBtn() {
    setFavorite(!favorite);
  }

  return (
    <form className="py-4 md:px-6">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-8 cursor-pointer hover:text-blue-500"
      >
        <ArrowLeft /> Voltar
      </button>
      <fieldset
        className="w-full flex justify-center flex-col 
      gap-4 "
      >
        <legend className="text-2xl font-bold mb-4  ">{title}</legend>
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
            className=" bg-white px-4 py-4 rounded-lg text-neutral-700 border-none outline-none h-40 resize-none"
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
            onClick={toggleCompletedBtn}
            className="flex gap-2 cursor-pointer"
          >
            <Circle fill={completed ? "#3b82f6" : "none"} />
            Concluído
          </button>
          <button
            type="button"
            onClick={toggleFavoriteBtn}
            className="flex gap-2 cursor-pointer"
          >
            <Star fill={favorite ? "#3b82f6" : "none"} /> Favoritar
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (title.trim() === "") {
                alert("Por favor, insira um título para a tarefa.");
                return;
              }
              if (title.length > 30) {
                alert("O título deve ter no máximo 30 caracteres.");
                return;
              }

              if (description.length > 200) {
                alert("A descrição deve ter no máximo 200 caracteres.");
                return;
              }
              handleSave();
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
