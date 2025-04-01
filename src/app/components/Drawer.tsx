import { CalendarDays, House, Star } from "lucide-react";

const Drawer = () => {
  return (
    <aside className="w-96 h-full">
      <nav>
        <ul className="list-none py-4">
          <li className="flex gap-4 items-center pl-8 py-3 text-neutral-800 hover:bg-blue-300">
            <House />
            <p> Tarefas</p>
          </li>
          <li className="flex gap-4 items-center pl-8 py-3 text-neutral-800 hover:bg-blue-300">
            <Star />
            <p> Favoritas</p>
          </li>
          <li className="flex gap-4 items-center pl-8 py-3 text-neutral-800 hover:bg-blue-300">
            <CalendarDays />
            <p> Planejado</p>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Drawer;
