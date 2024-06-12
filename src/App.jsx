import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";
import './index.css';
import { FaBars, FaHome, FaUserEdit, FaTrash } from 'react-icons/fa'; // Importing necessary icons

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });

  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo({ item, dueDate, dueTime, priority }) {
    setTodos(currentTodos => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title: item, dueDate, dueTime, priority, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id);
    });
  }

  function clearAllTasks() {
    setTodos([]);
  }

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <nav className="bg-cyan-600 text-white w-full md:w-72 p-4 flex flex-col md:h-full fixed md:relative left-0 top-0 md:top-auto md:left-auto">
        <div className="flex justify-between md:block">
          <h1 className="text-3xl font-bold animate-bounce">toTODO</h1>
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <FaBars />
          </button>
        </div>
        <ul className={`md:mt-4 mt-2 space-y-4 ${isNavOpen ? 'block' : 'hidden'} md:block`}>
          <li className="flex items-center space-x-4">
            <FaHome />
            <button className="w-full text-left hover:bg-transparent" onClick={() => alert("Home clicked")}>Home</button>
          </li>
          <li className="flex items-center space-x-2">
            <FaUserEdit />
            <button className="w-full text-left hover:bg-transparent" onClick={() => alert("Change Guardian clicked")}>Change Guardian</button>
          </li>
          <li className="flex items-center space-x-2">
            <FaTrash />
            <button className="w-full text-left hover:bg-transparent" onClick={clearAllTasks}>Clear All Tasks</button>
          </li>
        </ul>
      </nav>
      <div className="h-20"></div>
      <div className="flex-grow p-4 ml-0 md:ml-72">
        <NewTodoForm onSubmit={addTodo} />
        <h1 className="header mt-6 mb-2 text-2xl font-bold">Task List</h1>
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </div>
    </div>
  );
}
