"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import AddTaskInput from "../components/AddTaskInput";
import Container from "../components/Container";
import TaskItem from "../components/TaskItem";

import { useFilteredTasks } from "../hooks/useFilteredTasks";

const Tarefas = () => {
  const { addTask, completedTasks, incompleteTasks, toggle, toggleCompleted } =
    useFilteredTasks();

  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
        {incompleteTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            completed={task.completed}
            title={task.title}
            favorite={task.favorite}
            data={task.data}
          />
        ))}

        {incompleteTasks.length + completedTasks.length > 0 && (
          <button onClick={toggle} className="flex gap-1 text-neutral-800 mb-4">
            <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
            <ChevronDown className={toggleCompleted ? "block" : "hidden"} />
            Concluídos
          </button>
        )}

        {toggleCompleted &&
          completedTasks.map((task) => (
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

export default Tarefas;
