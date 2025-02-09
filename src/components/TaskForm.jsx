import { FaPlus } from "react-icons/fa6";
import { MdSubtitles } from "react-icons/md";
import { FaPenToSquare } from "react-icons/fa6";
import { useState } from "react";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import toast from "react-hot-toast";
// import { saveTasksToLocalStorage } from "../../utils/saveTasksToLocalStorage.js";
export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { dispatch } = useContext(TaskContext);

  function addNewTask(e) {
    e.preventDefault();
    dispatch({
      type: "ADD_TASK",
      payload: {
        id: Date.now(),
        title,
        description,
        dueDate,
        completed: false,
      },
    });
    toast.success("New Task Added!");
    setTitle("");
    setDescription("");
    setDueDate("");
  }
  return (
    <form className="flex flex-col">
      {/* an input fileds to take the task title and description and date */}
      <div className="relative">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none pl-10"
        />
        <MdSubtitles className="absolute left-3 top-3 transform" />
      </div>
      <div className="relative">
        <textarea
          rows={6}
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 w-full outline-none pl-10"
        />
        <FaPenToSquare className="absolute left-3 top-3 transform" />
      </div>
      <input
        type="date"
        className="p-2 border border-gray-300 rounded mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button
        onClick={(e) => addNewTask(e)}
        className="bg-white text-blue-600 p-2 flex items-center w-fit self-start px-5 outline-none rounded gap-2"
      >
        <FaPlus /> Add Task
      </button>
    </form>
  );
}
