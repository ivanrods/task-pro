"use client";
import { useParams } from "next/navigation";
import { useTask } from "../../context/TaskContext";
import { Circle, Star } from "lucide-react";
export default function TaskDetail() {
  const { task } = useParams<{ task: string }>();
  const { tasks } = useTask();
  const taskDetail = tasks.find((t) => t.id === task);
  console.log(tasks);
  return (
    <form>
      <fieldset className="w-full flex justify-center flex-col gap-6 md:px-6">
        <legend className="text-2xl font-bold mb-4">{taskDetail?.title}</legend>
        <input
          type="text"
          value={taskDetail?.title}
          className="bg-white px-4 py-4 rounded-lg text-blue-500 border-none outline-none"
        />
        <textarea
          name=""
          id=""
          placeholder="Adicione uma descrição"
          className="bg-white px-4 py-4 rounded-lg text-blue-500 border-none outline-none h-52"
        />
        <input
          type="date"
          name=""
          id=""
          className="bg-white px-4 py-4 rounded-lg text-blue-500 border-none outline-none"
        />
        <div className="w-full flex flex-col gap-4 text-blue-500">
          <button className="flex gap-2 ">
            <Circle /> concluído
          </button>
          <button className="flex gap-2 ">
            <Star /> Favoritar
          </button>
        </div>

        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="w-full bg-blue-500 text-white py-2 rounded-md cursor-pointer">
            Salvar
          </button>
          <button className="w-full text-blue-500 border py-2 rounded-md cursor-pointer">
            Excluir
          </button>
        </div>
      </fieldset>
    </form>
  );
}
