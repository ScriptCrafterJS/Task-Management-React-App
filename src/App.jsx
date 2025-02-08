import { Toaster } from "react-hot-toast";
import TaskFilter from "./components/TaskFilter";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { useState, useContext, useMemo } from "react";
import { TaskContext } from "./contexts/TaskContext";
import EditTaskModal from "./components/EditTaskModal";
import { IoIosAdd } from "react-icons/io";

function App() {
  const [isfiltered, setIsFiltered] = useState(false);
  const { tasks, modalIsOpen, searchedTerm } = useContext(TaskContext);

  const searchedTasks = useMemo(
    () =>
      tasks.filter(
        (task) =>
          task.title.includes(searchedTerm) ||
          task.description.includes(searchedTerm)
      ),
    [tasks, searchedTerm]
  );

  const sortedTasks = useMemo(
    () =>
      searchedTasks.sort((a, b) =>
        !isfiltered ? a.completed - b.completed : b.completed - a.completed
      ),
    [searchedTasks, isfiltered]
  );

  function filterTasks(isfiltered) {
    setIsFiltered(isfiltered);
  }
  return (
    <div className="bg-blue-600 px-4 md:px-24 py-8 h-screen flex flex-col gap-3">
      <header className="flex items-center justify-center lg:justify-start">
        <h1 className="text-4xl font-bold text-white m-0 p-0">
          Task Management App
        </h1>
      </header>
      <main className="flex flex-grow gap-9">
        {modalIsOpen && <EditTaskModal />}
        <aside className="flex flex-col justify-between basis-1/3 hidden lg:block">
          <TaskFilter filterTasks={filterTasks} isfiltered={isfiltered} />
          <TaskForm />
        </aside>
        <TaskList tasks={sortedTasks} />
        <button className="fixed bottom-5 right-5 bg-white text-blue-600 p-3 rounded-full shadow-lg">
          <IoIosAdd className="text-3xl " />
        </button>
      </main>
      <Toaster
        gutter={8}
        position="top-center"
        toastOptions={{
          success: {
            duration: 2000,
          },
        }}
      />
    </div>
  );
}

export default App;
