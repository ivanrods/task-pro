"use client";
import { usePathname } from "next/navigation";
import { House, Star, CalendarDays, CircleCheckBig } from "lucide-react";

const Title = () => {
  const pathname = usePathname();
  const titles: { [key: string]: { title: string; icon: React.ReactNode } } = {
    "/tasks": { title: "Tarefas", icon: <House /> },
    "/favorites": { title: "Favoritas", icon: <Star /> },
    "/planned": { title: "Planejado", icon: <CalendarDays /> },
  };

  const { title, icon } = titles[pathname] || {
    title: "Tarefa",
    icon: <CircleCheckBig />,
  };
  return (
    <div className="flex gap-2 justify-center items-center text-blue-500 text-xl font-bold py-8 md:justify-start">
      {icon} <h1>{title}</h1>
    </div>
  );
};

export default Title;
