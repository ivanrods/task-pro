"use client";
import { CalendarDays, Circle, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useStatusBar } from "../context/StatusBarContext";
import { useTaskStore } from "../store/taskStore";

type AddTaskInputProps = {
  addTask: (title: string, description: string, data: string) => void;
};

const taskSchema = z.object({
  title: z
    .string()
    .min(1, "Título obrigatório")
    .max(10, "Máximo 50 caracteres"),
  description: z.string().max(300, "Máximo 300 caracteres").optional(),
  data: z.string().optional(),
});

type TaskFormData = z.infer<typeof taskSchema>;

const AddTaskInput = ({ addTask }: AddTaskInputProps) => {
  const { tasks } = useTaskStore();
  const { showStatusBar } = useStatusBar();
  const [toggleDescription, setToggleDescription] = useState(false);
  const [toggleData, setToggleData] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      data: "",
    },
  });

  const onSubmit = async ({ title, description, data }: TaskFormData) => {
    const taskExists = tasks.some(
      (task) => task.title.trim().toLowerCase() === title.trim().toLowerCase()
    );

    if (taskExists) {
      showStatusBar("Já existe uma tarefa com esse título.", "red");
      return;
    }
    await addTask(title, description || "", data || "");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" bg-[var(--background)] text-[var(--text-color)] rounded-xl shadow-lg  overflow-hidden my-4"
    >
      <section className="flex gap-4 w-full  px-4 py-4  ">
        <Circle className={`text-[var(--primary-color)]`} />
        <input
          placeholder={errors.title?.message || "Adicioner uma tarefa"}
          className={`w-full border-none outline-none placeholder-[var(--border-color)] ${
            errors.title ? "placeholder-red-400" : ""
          }`}
          type="text"
          maxLength={50}
          {...register("title")}
        />
      </section>
      {toggleDescription && (
        <section
          className={`border-t border-[var(--border-color)] flex gap-4 mx-4 py-2 `}
        >
          <FileText className="text-[var(--primary-color)]" />
          <textarea
            className={`w-full border-none outline-none h-20 resize-none placeholder-[var(--border-color)] ${
              errors.description ? "placeholder-red-400" : ""
            }`}
            placeholder={
              errors.description?.message || "Adicione uma descrição"
            }
            {...register("description")}
            maxLength={300}
          />
        </section>
      )}

      <section className="dark:bg-neutral-950 bg-neutral-100 w-full py-2 px-4  flex justify-between items-center  text-[var(--text-color)]">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setToggleDescription(!toggleDescription)}
          >
            <FileText
              className={`hover:text-[var(--primary-color)] cursor-pointer ${
                toggleDescription
                  ? "text-[var(--primary-color)]"
                  : "text-[var(--text-color)]"
              } `}
            />
          </button>

          <div className="flex gap-2">
            <CalendarDays
              onClick={() => setToggleData(!toggleData)}
              className={`hover:text-[var(--primary-color)] cursor-pointer ${
                toggleData
                  ? "text-[var(--primary-color)]"
                  : "text-[var(--text-color)]"
              } `}
            />
            {toggleData && (
              <input
                type="date"
                className="text-[var(--text-color)]"
                {...register("data")}
              />
            )}
          </div>
        </div>

        <button className="rounded-md bg-[var(--primary-color)] px-3.5 py-2 text-sm font-semibold text-white shadow-xs hover:bg-[var(--primary-color-dark)] cursor-pointer">
          Adicionar
        </button>
      </section>
    </form>
  );
};

export default AddTaskInput;
