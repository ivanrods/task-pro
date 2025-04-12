"use client";
import AddTaskInput from "../components/AddTaskInput";
import Container from "../components/Container";
import TaskItem from "../components/TaskItem";
import { useTask } from "../context/TaskContext";
const Favorites = () => {
  const { addTask, tasks } = useTask();
  return (
    <div>
      <AddTaskInput addTask={addTask} />
      <Container>
        {tasks
          .filter((task) => task.favorite)
          .map((task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              completed={task.completed}
              title={task.title}
              favorite={task.favorite}
            />
          ))}
      </Container>
    </div>
  );
};

export default Favorites;
