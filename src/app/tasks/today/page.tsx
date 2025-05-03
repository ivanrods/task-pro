"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";

const Today = () => {
  const { completedTasksToday, incompleteTasksToday, toggle, toggleCompleted } =
    useFilteredTasks();

  return (
    <Container>
      {incompleteTasksToday.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          completed={task.completed}
          title={task.title}
          favorite={task.favorite}
          data={task.data}
        />
      ))}

      {completedTasksToday.length > 0 && (
        <ToggleCompletedButton onClick={toggle} toggleCompleted />
      )}

      {toggleCompleted &&
        completedTasksToday.map((task) => (
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

export default Today;
