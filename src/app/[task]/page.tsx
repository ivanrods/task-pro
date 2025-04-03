"use client"
import { useParams } from "next/navigation";

export default function TaskDetail() {
  const params = useParams(); 

  return (
    <div className="">
      <h1 className="text-2xl font-bold">Detalhes da Tarefa</h1>
      <p>ID da tarefa: {params.task}</p>
    </div>
  );
}