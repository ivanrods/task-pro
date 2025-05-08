"use client";
import { usePathname } from "next/navigation";
import {
  House,
  Star,
  CalendarDays,
  CircleCheckBig,
  Sun,
} from "lucide-react";

const Title = () => {
  const pathname = usePathname();
  const titles: { [key: string]: { title: string; icon: React.ReactNode } } = {
    "/tasks": { title: "Tarefas", icon: <House /> },
    "/tasks/today": { title: "Seu dia", icon: <Sun /> },
    "/tasks/favorites": { title: "Favoritas", icon: <Star /> },
    "/tasks/planned": { title: "Planejado", icon: <CalendarDays /> },
  };

  const { title, icon } = titles[pathname] || {
    title: "Tarefa",
    icon: <CircleCheckBig />,
  };
  return (
    <div className="flex gap-2 justify-center items-center text-[var(--primary-color)] text-xl font-bold  md:justify-start ">
      {icon} <h1>{title}</h1>
    </div>
  );
};

export default Title;
