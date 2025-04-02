"use client";
import { usePathname } from "next/navigation";
import { House, Star, CalendarDays } from "lucide-react";

const Title = () => {
  const pathname = usePathname();
  const titles: { [key: string]: { title: string; icon: React.ReactNode } } = {
    "/tasks": { title: "Tarefas", icon: <House /> },
    "/favorites": { title: "Favoritas", icon: <Star /> },
    "/planned": { title: "Planejado", icon: <CalendarDays /> },
  };

  const { title, icon } = titles[pathname] || {
    title: "Tarefas",
    icon: <House />,
  };
  return (
    <div className="flex gap-2 items-center text-blue-500 text-xl font-bold py-8">
      {icon} <h1>{title}</h1>
    </div>
  );
};

export default Title;
