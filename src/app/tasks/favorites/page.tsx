"use client";

import AddTaskInput from "../../components/AddTaskInput";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
import { ChevronDown, ChevronRight } from "lucide-react";
const Favorites = () => {
  const {
    addTask,
    completedTasksFavorites,
    incompleteTasksFavotites,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();
  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
        {incompleteTasksFavotites.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            completed={task.completed}
            title={task.title}
            favorite={task.favorite}
            data={task.data}
          />
        ))}

        {incompleteTasksFavotites.length + completedTasksFavorites.length > 0 && (
          <button onClick={toggle} className="flex gap-1 text-neutral-800 mb-4">
            <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
            <ChevronDown className={toggleCompleted ? "block" : "hidden"} />
            Concluídos
          </button>
        )}

        {toggleCompleted &&
          completedTasksFavorites.map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              completed={task.completed}
              title={task.title}
              favorite={task.favorite}
              data={task.data}
            />
          ))}
      </Container>
    </div>
  );
};

export default Favorites;
