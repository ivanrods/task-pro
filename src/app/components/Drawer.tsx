"use client";
import {
  CalendarDays,
  House,
  LogOut,
  Menu,
  Star,
  Sun,
  SunMoon,
} from "lucide-react";

import { useState } from "react";
import { useTheme } from '../context/ThemeContext';
import SidebarItem from "./SidebarItem";
import Image from "next/image";
const Drawer = () => {
  const [handleDrawer, setHandleDrawer] = useState(false);
  const { toggleTheme } = useTheme();

  function toggleDrawer() {
    setHandleDrawer(!handleDrawer);
  }
  return (
    <div className="relative z-50">
      <button
        className="absolute md:hidden top-8 left-8 "
        onClick={toggleDrawer}
      >
        <Menu />
      </button>

      <section
        className={`bg-[var(--background)] text-[var(--text-color)] flex flex-col justify-between gap-4 z-10 h-full w-72 xl:w-80  fixed top-0 left-0 px-2 pb-2 max-h-screen overflow-auto transition-transform duration-300 ease-in-out transform shadow-lg ${
          handleDrawer ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div>
          <button>
            <Menu className="md:hidden ml-8 mt-8" onClick={toggleDrawer} />
          </button>

          <div className="w-full px-3 py-4 flex gap-2 flex-col border-b-1 border-b-neutral-400">
            <Image
              width={60}
              height={60}
              className="rounded-full"
              src="https://avatars.githubusercontent.com/u/67488687?v=4"
              alt="imagem do usuario"
            />
            <div>
              <p className="text-lg font-semibold ">Ivan Rodrigues</p>
              <p className="text-sm">contaivanrodrigues@gmail.com</p>
            </div>
          </div>

          <div className="flex flex-col gap-1 list-none py-4 ">
            <SidebarItem href="/tasks" icon={<House />} label="Tarefas" />
            <SidebarItem href="/tasks/today" icon={<Sun />} label="Meu dia" />

            <SidebarItem
              href="/tasks/favorites"
              icon={<Star />}
              label="Favoritas"
            />
            <SidebarItem
              href="/tasks/planned"
              icon={<CalendarDays />}
              label="Planejado"
            />
          </div>
        </div>

        <div>
          <button
            onClick={toggleTheme}
            className="flex gap-4 items-center px-3 py-3 w-full rounded-md text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white cursor-pointer mb-1"
          >
            <SunMoon /> Mudar tema
          </button>
          <button className="flex gap-4 items-center px-3 py-3 w-full rounded-md text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white cursor-pointer">
            <LogOut /> Sair
          </button>
        </div>
      </section>
    </div>
  );
};

export default Drawer;
