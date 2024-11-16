import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
const TaskContext = createContext();

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
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_STATUS":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    default:
      return state;
  }
};

const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks ? tasks : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { TaskContext, TaskProvider };
