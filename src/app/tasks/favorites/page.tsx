"use client";

import ToggleCompletedButton from "@/app/components/ToggleCompletedButton";
import AddTaskInput from "../../components/AddTaskInput";
import Container from "../../components/Container";
import TaskItem from "../../components/TaskItem";
import { useFilteredTasks } from "../../hooks/useFilteredTasks";
const Favorites = () => {
  const {
    addTask,
    completedTasksFavorites,
    incompleteTasksFavotites,
    toggle,
    toggleCompleted,
  } = useFilteredTasks();
  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
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
         <ToggleCompletedButton onClick={toggle} toggleCompleted/>
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
    </div>
  );
};

export default Favorites;
