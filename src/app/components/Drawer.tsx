"use client";
import { CalendarDays, House, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Drawer = () => {
  const pathname = usePathname()
  return (
    <aside className="w-96 h-full">
      <nav>
        <ul className="list-none py-4">
          <Link href="/tasks">
            <li className={`flex gap-4 items-center pl-8 py-3 w-full ${
                pathname === "/tasks" ? "bg-blue-500 text-white" : "text-neutral-800 hover:bg-blue-300"
              }`}>
              <House />
              <p> Tarefas</p>
            </li>
          </Link>
          <Link href="/favorites">
            <li className={`flex gap-4 items-center pl-8 py-3 w-full ${
                pathname === "/favorites" ? "bg-blue-500 text-white" : "text-neutral-800 hover:bg-blue-300"
              }`}>
              <Star />
              <p> Favoritas</p>
            </li>
          </Link>
          <Link href="/planned">
            <li className={`flex gap-4 items-center pl-8 py-3 w-full ${
                pathname === "/planned" ? "bg-blue-500 text-white" : "text-neutral-800 hover:bg-blue-300"
              }`}>
              <CalendarDays />
              <p> Planejado</p>
            </li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};

export default Drawer;
