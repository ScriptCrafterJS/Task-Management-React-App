import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { saveTasksToLocalStorage } from "../../utils/saveTasksToLocalStorage.js";
export default function EditTaskModal() {
  const { dispatch, toggleModal, taskToEdit, tasks } = useContext(TaskContext);
  const [title, setTitle] = useState(taskToEdit.title);
  const [description, setDescription] = useState(taskToEdit.description);
  const [dueDate, setDueDate] = useState(taskToEdit.dueDate);
  const task = { title, description, dueDate, id: taskToEdit.id };

  return (
    <div className="z-10 p-4 h-5/6  w-1/2 bg-blue-500 shadow-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <button className="mb-5" onClick={() => toggleModal()}>
        <IoMdClose className="text-3xl text-white" />
      </button>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ payload: task, type: "EDIT_TASK" });
          saveTasksToLocalStorage(tasks);
          toast.success("Task updated successfully");
        }}
      >
        <input
          id="task-title"
          type="text"
          value={task.title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none"
        />
        <input
          id="task-description"
          type="text-area"
          value={task.description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none"
        />
        <input
          id="task-due-date"
          type="date"
          value={task.dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none"
        />
        <button
          type="submit"
          className="bg-white hover:bg-blue-100 text-blue-500 py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
