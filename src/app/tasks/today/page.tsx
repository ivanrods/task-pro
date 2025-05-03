"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import AddTaskInput from "../../components/AddTaskInput";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";

const Today = () => {
  const {
    addTask,
    completedTasksToday,
    incompleteTasksToday,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();

  return (
    <div>
      <AddTaskInput addTask={addTask} />
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
         <ToggleCompletedButton onClick={toggle} toggleCompleted/>
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
    </div>
  );
};

export default Today;
