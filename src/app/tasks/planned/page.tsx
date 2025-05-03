"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import AddTaskInput from "../../components/AddTaskInput";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";

import { useFilteredTasks } from "../../hooks/useFilteredTasks";


const Planned = () => {
  const {
    addTask,
    completedTasksPlanned,
    incompleteTasksPlanned,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();
  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
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

        {completedTasksPlanned.length >
          0 && (
          <ToggleCompletedButton onClick={toggle} toggleCompleted/>
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
    </div>
  );
};

export default Planned;
