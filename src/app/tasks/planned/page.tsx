"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";

import { useFilteredTasks } from "../../hooks/useFilteredTasks";

const Planned = () => {
  const {
    completedTasksPlanned,
    incompleteTasksPlanned,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();
  return (
    <Container>
      {incompleteTasksPlanned.length == 0 && (
        <p className="text-[var(--text-color)]  mx-auto">
          Sem tarefa planejada pendente
        </p>
      )}
      {incompleteTasksPlanned.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          completed={task.completed}
          title={task.title}
          favorite={task.favorite}
          data={task.data}
        />
      ))}

      {completedTasksPlanned.length > 0 && (
        <ToggleCompletedButton onClick={toggle} toggleCompleted />
      )}

      {toggleCompleted &&
        completedTasksPlanned.map((task) => (
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

export default Planned;
