"use client";

import AddTaskInput from "../../components/AddTaskInput";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";

import { ChevronDown, ChevronRight } from "lucide-react";

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

        {incompleteTasksToday.length + completedTasksToday.length > 0 && (
          <button onClick={toggle} className="flex gap-1 text-neutral-800 mb-4">
            <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
            <ChevronDown className={toggleCompleted ? "block" : "hidden"} />
            Concluídos
          </button>
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
