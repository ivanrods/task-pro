"use client";
import { usePathname } from "next/navigation";
import { House, Star, CalendarDays, CircleCheckBig, SquareCheck, Sun } from "lucide-react";

const Title = () => {
  const pathname = usePathname();
  const titles: { [key: string]: { title: string; icon: React.ReactNode } } = {
    "/tasks": { title: "Tarefas", icon: <House /> },
    "/tasks/today": { title: "Seu dia", icon:  <Sun /> },
    "/tasks/favorites": { title: "Favoritas", icon: <Star /> },
    "/tasks/planned": { title: "Planejado", icon: <CalendarDays /> },
    "/tasks/to-do": { title: "Pendentes", icon:  <SquareCheck /> },
    
  };

  const { title, icon } = titles[pathname] || {
    title: "Tarefa",
    icon: <CircleCheckBig />,
  };
  return (
    <div className="flex gap-2 justify-center items-center text-blue-500 text-xl font-bold py-8 md:justify-start ">
      {icon} <h1>{title}</h1>
    </div>
  );
};

export default Title;
