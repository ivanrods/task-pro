"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SidebarItemProps {
  href: string;
  icon: ReactNode;
  label: string;
}

const SidebarItem = ({ href, icon, label }: SidebarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;
  return (
    <Link href={href}>
      <li
        className={`flex gap-4 items-center px-3 py-3 w-full rounded-md ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-neutral-800 hover:bg-blue-500 hover:text-white"
        }`}
      >
        {icon}
        <p>{label}</p>
      </li>
    </Link>
  );
};

export default SidebarItem;
