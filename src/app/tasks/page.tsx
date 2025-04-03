import AddTaskInput from "../components/AddTaskInput";
import TaskItem from "../components/TaskItem";

const Tarefas = () => {
  return (
    <div>
      <div>
        <AddTaskInput />
      </div>
      <TaskItem /> <TaskItem /> <TaskItem />
    </div>
  );
};

export default Tarefas;
