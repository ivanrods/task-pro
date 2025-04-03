import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";

const Planned = () => {
  return (
    <div>
      <div><AddTaskInput />
      </div>
      <TaskItem /> <TaskItem />
    </div>
  );
};

export default Planned;
