import { useContext, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { IoMdClose } from "react-icons/io";
export default function EditTaskModal() {
  const { dispatch } = useContext(TaskContext);
  const [task, setTask] = useState(taskToEdit);
  return (
    <div className="p-4 h-96 w-96 bg-blue-500 shadow-md absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <button className="mb-5" onClick={() => setIsEditModalOpen(false)}>
        <IoMdClose className="text-3xl text-white" />
      </button>
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(task, "EDIT_TASK");
        }}
      >
        <input
          id="task-title"
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none"
        />
        <input
          id="task-description"
          type="text"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none"
        />
        <input
          id="task-due-date"
          type="text"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
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
