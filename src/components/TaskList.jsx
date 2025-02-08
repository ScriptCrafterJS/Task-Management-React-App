import Task from "./Task";
import PropTypes from "prop-types";

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default function TaskList({ tasks }) {
  return (
    <div className="lg:basis-2/3 w-full flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:auto-rows-min max-h-[80vh] overflow-y-auto">
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </div>
  );
}
