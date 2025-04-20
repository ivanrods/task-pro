"use client";
import {
  CalendarDays,
  House,
  Menu,
  SquareCheck,
  Star,
} from "lucide-react";

import { useState } from "react";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
const Drawer = () => {
  const [handleDrawer, setHandleDrawer] = useState(false);
  function toggleDrawer() {
    setHandleDrawer(!handleDrawer);
  }
  return (
    <div className="relative">
      <button className="absolute md:hidden top-8 left-8 " onClick={toggleDrawer}>
        <Menu />
      </button>

      <section
        className={`z-10 h-full w-72  xl:w-80 bg-white fixed top-0 left-0 transition-transform duration-300 ease-in-out transform shadow-lg ${
          handleDrawer ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <button>
          <Menu className="md:hidden ml-8 mt-8" onClick={toggleDrawer} />
        </button>

        <div className="w-full px-6 py-4 flex gap-2 flex-col border-b-1 border-b-neutral-400">
          <Image
            width={60}
            height={60}
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/67488687?v=4"
            alt="imagem do usuario"
          />
          <div>
            <p className="text-lg font-semibold text-neutral-700">Ivan Rodrigues</p>
            <p className="text-sm text-neutral-700">contaivanrodrigues@gmail.com</p>
          </div>
        </div>

        <div className="flex flex-col gap-1 list-none py-4 px-2 ">
          <SidebarItem href="/tasks" icon={<House />} label="Tarefas" />
          <SidebarItem href="/tasks/to-do" icon={<SquareCheck />} label="Pendentes" />
          <SidebarItem href="/tasks/favorites" icon={<Star />} label="Favoritas" />
          <SidebarItem
            href="/tasks/planned"
            icon={<CalendarDays />}
            label="Planejado"
          />
        </div>
      </section>
    </div>
  );
};

export default Drawer;
