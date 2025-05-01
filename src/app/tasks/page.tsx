"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import AddTaskInput from "../components/AddTaskInput";
import Container from "../components/Container";
import TaskItem from "../components/TaskItem";

import { useTask } from "../context/TaskContext";
import { useState } from "react";

const Tarefas = () => {
  const { addTask, tasks } = useTask();
  const [toggleCompleted, setToggleCompleted] = useState(true);
  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
        {tasks
  
          .filter((task) => task.completed === false)
          .map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              completed={task.completed}
              title={task.title}
              favorite={task.favorite}
              data={task.data}
            />
          ))}

        {tasks.length != 0 && (
          <button
            onClick={() => setToggleCompleted(!toggleCompleted)}
            className="flex gap-1 text-neutral-800 mb-4 "
          >
            <ChevronRight className={toggleCompleted ? "hidden" : "block"} />
            <ChevronDown className={toggleCompleted ? " block" : "hidden"} />
            Concluídos
          </button>
        )}

        {toggleCompleted &&
          tasks
            .filter((task) => task.completed === true)
            .map((task) => (
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
