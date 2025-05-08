"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
const Favorites = () => {
  const {
    completedTasksFavorites,
    incompleteTasksFavotites,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();
  return (
    <Container>
      {incompleteTasksFavotites.length == 0 && (
        <p className="text-[var(--text-color)]  mx-auto">Sem tarefa favorita pendente</p>
      )}

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

      {completedTasksFavorites.length > 0 && (
        <ToggleCompletedButton onClick={toggle} toggleCompleted />
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
  );
};

export default Favorites;
