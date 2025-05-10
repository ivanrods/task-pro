"use client";
import { useParams } from "next/navigation";
import { useTask } from "../../context/TaskContext";
import { ArrowLeft, Circle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InputForm from "@/app/components/InputForm";
import { useStatusBar } from "@/app/context/StatusBarContext";
import ButtonInput from "@/app/components/ButtonInput";

export default function TaskDetail() {
  const router = useRouter();
  const { task } = useParams<{ task: string }>();
  const { tasks, deleteTask, updateTask } = useTask();
  const { showStatusBar } = useStatusBar();

  const taskDetail = tasks.find((t) => t.id === task);

  const [title, setTitle] = useState(taskDetail?.title || "");
  const [description, setDescription] = useState(taskDetail?.description || "");
  const [data, setData] = useState(taskDetail?.data || "");
  const [completed, setCompleted] = useState(taskDetail?.completed ?? false);
  const [favorite, setFavorite] = useState(taskDetail?.favorite ?? false);

  useEffect(() => {
    if (taskDetail) {
      setTitle(taskDetail.title);
      setDescription(taskDetail.description);
      setData(taskDetail.data);
      setCompleted(taskDetail.completed);
      setFavorite(taskDetail.favorite);
    }
  }, [taskDetail]);

  const handleSave = (id: string) => {
    const taskExists = tasks.some(
      (task) =>
        task.id !== id &&
        task.title.trim().toLowerCase() === title.trim().toLowerCase()
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

    if (taskDetail) {
      updateTask(taskDetail.id, title, description, data, completed, favorite);
      showStatusBar("Tarefa atualizada", "blue");
    }
  };

  return (
    <div className="h-full ">
      <form className="h-full flex flex-col gap-4 justify-around">
        <fieldset
          className="w-full flex flex-col  gap-4  
      "
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="text-[var(--text-color)] flex items-center gap-2 mb-8  cursor-pointer hover:text-[var(--primary-color)]"
          >
            <ArrowLeft /> Voltar
          </button>
          <h3 className="text-[var(--text-color)] break-words max-w-full text-2xl font-bold mb-4 whitespace-pre-wrap break-all">
            {title}
          </h3>

          <InputForm
            type="text"
            id="title"
            value={title}
            placeholder="Digite o título"
            maxLength={50}
            onChange={(e) => setTitle(e.target.value)}
            label="Titulo da tarefa"
          />

          <InputForm
            type="textarea"
            id="description"
            value={description}
            placeholder="Adicione uma descrição"
            onChange={(e) => setDescription(e.target.value)}
            maxLength={300}
            label="Descrição da tarefa:"
          />

          <InputForm
            type="date"
            id="date"
            value={data}
            placeholder="Data da tarefa:"
            maxLength={300}
            onChange={(e) => setData(e.target.value)}
            label="Data da tarefa"
          />

          <div className="w-full flex flex-col gap-4 text-[var(--primary-color)]">
            <button
              type="button"
              onClick={() => setCompleted(!completed)}
              className="flex gap-2 cursor-pointer"
            >
              <Circle fill={completed ? "var(--primary-color)" : "none"} />
              Concluído
            </button>
            <button
              type="button"
              onClick={() => setFavorite(!favorite)}
              className="flex gap-2 cursor-pointer"
            >
              <Star fill={favorite ? "var(--primary-color)" : "none"} />{" "}
              Favoritar
            </button>
          </div>
        </fieldset>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <ButtonInput
          variant="save"
            title="Salvar"
            onClick={() => {
              if (taskDetail) {
                handleSave(taskDetail.id);
              }
            }}
          />
          <ButtonInput
          variant="delete"
            title="Excluir"
            onClick={() => {
              if (taskDetail) {
                deleteTask(taskDetail.id);
                showStatusBar("Tarefa excluida", "red");
                router.back();
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}
