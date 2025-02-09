import PropTypes from "prop-types";
import { GoPencil } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { useState, useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import toast from "react-hot-toast";
import { saveTasksToLocalStorage } from "../../utils/saveTasksToLocalStorage.js";
Task.propTypes = {
  task: PropTypes.object.isRequired,
};
export default function Task({ task }) {
  const [completed, setCompleted] = useState(task.completed);
  const { dispatch, toggleModal, setTaskToEdit, tasks } =
    useContext(TaskContext);
  return (
    <div className="p-3 bg-white rounded shadow-md flex flex-col">
      <header className="flex justify-between">
        <h2>{task.title}</h2>
        {task.completed ? (
          <span className="flex items-center text-purple-500 bg-purple-200 px-3 rounded-full text-xs font-semibold">
            Done
          </span>
        ) : (
          <span className="flex items-center text-green-500 bg-green-200 px-3 rounded-full text-xs font-semibold">
            To Do
          </span>
        )}
      </header>
      <p className="text-sm text-gray-600 mt-2 grow">{task.description}</p>
      <time className="block text-xs text-black my-5">Due: {task.dueDate}</time>
      <footer className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            id="task-status"
            type="checkbox"
            checked={completed}
            onChange={() => {
              setCompleted(!completed);
              dispatch({ type: "TOGGLE_STATUS", payload: task.id });
              saveTasksToLocalStorage(tasks);
            }}
            className="mr-2 scale-150"
            aria-label="Mark Task Title as done"
          />
          <span className="text-sm">Done</span>
        </label>
        <div className="flex space-x-2">
          <button
            id="edit-task"
            type="button"
            className="px-4 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full flex items-center gap-1"
            aria-label="Edit Task Title and Description"
            onClick={() => {
              toggleModal();
              setTaskToEdit(task);
            }}
          >
            <GoPencil />
            Edit
          </button>
          <button
            type="button"
            className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-500 rounded-full"
            aria-label="Delete Task Title"
            onClick={() => {
              dispatch({ type: "DELETE_TASK", payload: task.id });
              saveTasksToLocalStorage(tasks);
              toast.success("Task Deleted");
            }}
          >
            <HiOutlineTrash />
          </button>
        </div>
      </footer>
    </div>
  );
}
