import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { saveTasksToLocalStorage } from "../../utils/saveTasksToLocalStorage";

// const initialState = [
//   {
//     id: 1,
//     title: "Feed the Dog",
//     description: "The dog did not eat yesterday, feed it today",
//     dueDate: "2024-11-16",
//     completed: true,
//   },
//   {
//     id: 2,
//     title: "Buy groceries",
//     description: "go to the grocery store and buy some eggs and milk",
//     dueDate: "2024-11-16",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Go to the gym",
//     description: "go to the gym and do some cardio",
//     dueDate: "2024-11-17",
//     completed: false,
//   },
// ];

const taskReducer = (state, action) => {
  const updateTasks = (updatedTasks) => {
    saveTasksToLocalStorage(updatedTasks);
    return updatedTasks;
  };

  switch (action.type) {
    case "SET_TASKS":
      return action.payload;
    case "ADD_TASK": {
      const updatedTasks = [...state, action.payload];
      return updateTasks(updatedTasks);
    }
    case "DELETE_TASK": {
      const updatedTasks = state.filter((task) => task.id !== action.payload);
      return updateTasks(updatedTasks);
    }
    case "TOGGLE_STATUS": {
      const updatedTasks = state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      return updateTasks(updatedTasks);
    }
    case "EDIT_TASK": {
      const updatedTasks = state.map((task) =>
        //here the payload is a task object
        task.id === action.payload.id ? action.payload : task
      );
      return updateTasks(updatedTasks);
    }
    default:
      return state;
  }
};

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [searchedTerm, setSearchedTerm] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      dispatch({ type: "SET_TASKS", payload: JSON.parse(data) });
    }
  }, []);

  function toggleModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        dispatch,
        modalIsOpen,
        toggleModal,
        taskToEdit,
        setTaskToEdit,
        searchedTerm,
        setSearchedTerm,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { TaskContext, TaskProvider };
