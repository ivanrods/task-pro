"use client";


import AddTaskInput from "../components/AddTaskInput";
import Container from "../components/Container";
import TaskItem from "../components/TaskItem";

import { useFilteredTasks } from "../hooks/useFilteredTasks";
import ButtonToggleCompletedTask from "../components/ToggleCompletedButton";

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

        {completedTasks.length > 0 && (
          <ButtonToggleCompletedTask
            toggleCompleted={toggleCompleted}
            onClick={toggle}
          />
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
