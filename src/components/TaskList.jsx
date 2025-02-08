import Task from "./Task";
import PropTypes from "prop-types";

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default function TaskList({ tasks }) {
  return (
    <div className=" basis-2/3 grid grid-cols-2 gap-4 auto-rows-min max-h-[80vh] overflow-y-auto">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
