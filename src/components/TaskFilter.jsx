import { BiSearchAlt } from "react-icons/bi";
import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import PropTypes from "prop-types";

TaskFilter.propTypes = {
  isfiltered: PropTypes.bool.isRequired,
  filterTasks: PropTypes.func.isRequired,
};
export default function TaskFilter({ isfiltered, filterTasks }) {
  const { searchedTerm, setSearchedTerm } = useContext(TaskContext);
  return (
    <>
      <div className="relative">
        <input
          id="search"
          type="text"
          placeholder="search tasks by title or description"
          className="p-2 border border-gray-300 rounded w-full outline-none pl-10"
          value={searchedTerm}
          onChange={(e) => setSearchedTerm(e.target.value)}
        />
        <BiSearchAlt className="absolute left-3 top-3 transform" />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-white text-lg w-fit">
          <input
            className="scale-150 mr-2"
            type="radio"
            name="filter"
            checked={!isfiltered}
            onChange={() => filterTasks(false)}
          />
          To Do
        </label>
        <label className="text-white text-lg w-fit">
          <input
            className="scale-150 mr-2"
            type="radio"
            name="filter"
            checked={isfiltered}
            onChange={() => filterTasks(true)}
          />
          Done
        </label>
      </div>
    </>
  );
}
