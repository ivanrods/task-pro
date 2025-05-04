"use client";

import Container from "../components/Container";
import TaskItem from "../components/TaskItem";

import { useFilteredTasks } from "../hooks/useFilteredTasks";
import ButtonToggleCompletedTask from "../components/ToggleCompletedButton";

const Tarefas = () => {
  const { completedTasks, incompleteTasks, toggle, toggleCompleted } =
    useFilteredTasks();

  return (
    <Container>
      {incompleteTasks.length == 0 && (
        <p className="text-neutral-800 mx-auto">Sem tarefa pendente</p>
      )}
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
  );
};

export default Tarefas;
