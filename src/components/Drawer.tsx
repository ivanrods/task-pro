"use client";
import { useRouter } from "next/navigation";

import {
  CalendarDays,
  House,
  LogOut,
  Menu,
  Star,
  Sun,
  SunMoon,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import Link from "next/link";
const Drawer = () => {
  const [handleDrawer, setHandleDrawer] = useState(false);
  const { toggleTheme } = useTheme();
  const router = useRouter();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = await res.json();
        setName(user.name);
        setEmail(user.email);
        setAvatar(user.avatar);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      }
    };

    fetchUser();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  function toggleDrawer() {
    setHandleDrawer(!handleDrawer);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        handleDrawer &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setHandleDrawer(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleDrawer]);

  return (
    <div className="relative z-50">
      <button
        className="absolute md:hidden top-8 left-8 "
        onClick={toggleDrawer}
      >
        <Menu className="text-[var(--text-color)]" />
      </button>

      <section
        ref={drawerRef}
        className={`bg-[var(--background)] text-[var(--text-color)] flex flex-col justify-between gap-4 z-10 h-full w-72 xl:w-80  fixed top-0 left-0 px-2 pb-2 max-h-screen overflow-auto transition-transform duration-300 ease-in-out transform shadow-lg ${
          handleDrawer ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static`}
      >
        <div>
          <div className="w-full px-3 py-4 flex gap-4 flex-col border-b-1 border-b-neutral-400">
            <Image
              width={100}
              height={100}
              className="rounded-full cursor-pointer mx-auto mt-4"
              src={avatar || "/profile.png"}
              alt="imagem do usuario"
              priority
              onClick={() => router.push("/profile")}
            />
            <div>
              <p className="text-lg font-semibold line-clamp-1">
                {!name ? "User" : name}
              </p>
              {email && <p className="text-sm line-clamp-1">{email}</p>}

              {!name && (
                <Link href="/login" className="text-sm">
                  Entrar
                </Link>
              )}
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
          {name && (
            <button
              onClick={logout}
              className="flex gap-4 items-center px-3 py-3 w-full rounded-md text-[var(--text-color)] hover:bg-[var(--primary-color)] hover:text-white cursor-pointer"
            >
              <LogOut /> Sair
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Drawer;
