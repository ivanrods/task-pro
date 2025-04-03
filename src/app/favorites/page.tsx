import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";

const Favorites = () => {
  return (
    <div>
      <div>
      <AddTaskInput />
      </div>
      <TaskItem /> <TaskItem /> <TaskItem />
      <TaskItem />
      <TaskItem />
    </div>
  );
};

export default Favorites;
