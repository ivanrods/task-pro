"use client";
import { CalendarDays, House, Menu, SquareCheck, Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const Drawer = () => {
  const pathname = usePathname();
  const [handleDrawer, setHandleDrawer] = useState(false);
  function toggleDrawer() {
    setHandleDrawer(!handleDrawer);
  }
  return (
    <div className="bg-white ">
      <button className="fixed md:hidden top-8 left-8 " onClick={toggleDrawer}>
        <Menu />
      </button>

      <section
        className={`z-10 w-72 xl:w-80 h-full bg-white fixed top-0 left-0 transition-transform duration-300 ease-in-out transform shadow-lg ${
          handleDrawer ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <button>
          <Menu className="md:hidden ml-8 mt-8" onClick={toggleDrawer} />
        </button>
        <nav>
          <ul className="list-none py-4">
            <Link href="/tasks">
              <li
                className={`flex gap-4 items-center pl-8 py-3 w-full ${
                  pathname === "/tasks"
                    ? "bg-blue-500 text-white"
                    : "text-neutral-800 hover:bg-blue-300"
                }`}
              >
                <House />
                <p> Tarefas</p>
              </li>
            </Link>
            <Link href="/to-do">
              <li
                className={`flex gap-4 items-center pl-8 py-3 w-full ${
                  pathname === "/to-do"
                    ? "bg-blue-500 text-white"
                    : "text-neutral-800 hover:bg-blue-300"
                }`}
              >
                <SquareCheck />
                <p>To Do</p>
              </li>
            </Link>
            <Link href="/favorites">
              <li
                className={`flex gap-4 items-center pl-8 py-3 w-full ${
                  pathname === "/favorites"
                    ? "bg-blue-500 text-white"
                    : "text-neutral-800 hover:bg-blue-300"
                }`}
              >
                <Star />
                <p> Favoritas</p>
              </li>
            </Link>
            <Link href="/planned">
              <li
                className={`flex gap-4 items-center pl-8 py-3 w-full ${
                  pathname === "/planned"
                    ? "bg-blue-500 text-white"
                    : "text-neutral-800 hover:bg-blue-300"
                }`}
              >
                <CalendarDays />
                <p> Planejado</p>
              </li>
            </Link>
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Drawer;
