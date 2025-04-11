"use client";
import {
  CalendarDays,
  CircleUserRound,
  House,
  Menu,
  SquareCheck,
  Star,
} from "lucide-react";

import { useState } from "react";
import SidebarItem from "./SidebarItem";
const Drawer = () => {

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
        <div className="w-full px-6 py-4 flex gap-2 flex-col border-b-1 border-b-neutral-400">
          <CircleUserRound size={50} color="#3b82f6" />
          <div>
            <p className="text-lg font-semibold text-neutral-700">Ivan</p>
            <p className="text-sm text-neutral-700">ivan@email.com</p>
          </div>
        </div>

        <nav>
          <ul className="flex flex-col gap-1 list-none py-4 px-2">
            <SidebarItem href="/tasks" icon={<House />} label="Tarefas" />
            <SidebarItem
              href="/to-do"
              icon={<SquareCheck />}
              label="Pendentes"
            />
            <SidebarItem href="/favorites" icon={<Star />} label="Favoritas" />
            <SidebarItem
              href="/planned"
              icon={<CalendarDays />}
              label="Planejado"
            />
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default Drawer;
