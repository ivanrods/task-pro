"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useTask } from "../../context/TaskContext";
import { Circle, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import InputForm from "@/app/components/InputForm";
import { useStatusBar } from "@/app/context/StatusBarContext";
import ButtonInput from "@/app/components/ButtonInput";
import ButtonBack from "@/app/components/ButtonBack";

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Título obrigatório")
    .max(50, "Máximo 50 caracteres"),
  description: z.string().max(300, "Máximo 300 caracteres").optional(),
  data: z.string().optional(),
  completed: z.boolean().optional(),
  favorite: z.boolean().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

export default function TaskDetail() {
  const router = useRouter();
  const { task } = useParams<{ task: string }>();
  const { tasks, deleteTask, updateTask } = useTask();
  const { showStatusBar } = useStatusBar();
  const taskDetail = tasks.find((t) => t.id === task);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: taskDetail?.title || "",
      description: taskDetail?.description || "",
      data: taskDetail?.data || "",
      completed: taskDetail?.completed || false,
      favorite: taskDetail?.favorite || false,
    },
  });

  const completed = watch("completed");
  const favorite = watch("favorite");

  const onSubmit = (data: TaskFormData) => {
    const taskExists = tasks.some(
      (task) =>
        task.id !== taskDetail?.id &&
        task.title.trim().toLowerCase() === data.title.trim().toLowerCase()
    );

    if (taskExists) {
      showStatusBar("Já existe uma tarefa com esse título.", "red");
      return;
    }

    if (taskDetail) {
      updateTask(
        taskDetail.id,
        data.title,
        data.description || "",
        data.data || "",
        data.completed || false,
        data.favorite || false
      );
      showStatusBar("Tarefa atualizada", "blue");
    }
  };

  return (
    <div className="h-full flex flex-col ">
      <form className="h-full flex flex-col gap-4  justify-between">
        <fieldset
          className="w-full flex flex-col gap-4 pt-4
      "
        >
          <ButtonBack onClick={() => router.back()} />
          <h3 className="text-[var(--text-color)] break-words max-w-full text-2xl font-bold mb-4 whitespace-pre-wrap break-all">
            {watch("title")}
          </h3>

          <InputForm
            type="text"
            id="title"
            placeholder="Digite o título"
            maxLength={50}
            {...register("title")}
            label="Título da tarefa"
            error={errors.title?.message}
          />

          <InputForm
            type="textarea"
            id="description"
            placeholder="Adicione uma descrição"
            {...register("description")}
            maxLength={299}
            label="Descrição da tarefa:"
            error={errors.description?.message}
          />
          <InputForm
            type="date"
            id="date"
            placeholder="Data da tarefa:"
            maxLength={300}
            {...register("data")}
            label="Data da tarefa"
          />

          <div className="w-full flex flex-col gap-4 text-[var(--primary-color)]">
            <button
              type="button"
              onClick={() => setValue("completed", !completed)}
              className="flex gap-2 cursor-pointer"
            >
              <Circle fill={completed ? "var(--primary-color)" : "none"} />
              Concluído
            </button>
            <button
              type="button"
              onClick={() => setValue("favorite", !favorite)}
              className="flex gap-2 cursor-pointer"
            >
              <Star fill={favorite ? "var(--primary-color)" : "none"} />{" "}
              Favoritar
            </button>
          </div>
        </fieldset>
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4">
          <ButtonInput
            type="button"
            variant="save"
            title="Salvar"
            onClick={handleSubmit(onSubmit)}
          />
          <ButtonInput
            type="button"
            variant="delete"
            title="Excluir"
            onClick={() => {
              if (taskDetail) {
                deleteTask(taskDetail.id);
                showStatusBar("Tarefa excluida", "blue");
                router.back();
              }
            }}
          />
        </div>
      </form>
    </div>
  );
}
