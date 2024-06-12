import { useState } from 'react';
import PropTypes from 'prop-types';
import EditTodoDialog from './EditDialog';

export function TodoItem({ completed, id, title, dueDate, dueTime, priority, toggleTodo, deleteTodo, editTodo }) {
  const priorityClasses = {
    High: 'text-red-500',
    Medium: 'text-yellow-500',
    Low: 'text-green-500',
  };

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditSave = (updatedTodo) => {
    editTodo(updatedTodo);
    setIsEditDialogOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <li className="flex items-center gap-2 p-2 rounded-md bg-white shadow-md transition-all duration-300 hover:scale-105 min-w-[200px] max-w-full sm:min-w-[300px] md:min-w-[450px]">
        <label className="flex items-center gap-1 cursor-pointer text-lg font-medium flex-grow">
          <input
            className="w-4 h-4 rounded-sm bg-cyan-100 flex items-center justify-center hover:bg-cyan-200 transition-colors duration-300"
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <span className={`${completed ? 'line-through' : ''} transition-colors duration-300`}>
            {title}
          </span>
        </label>
        <div className="flex flex-col ml-auto">
          <div className="text-sm text-gray-500">
            <span className="font-semibold">Due:</span> {dueDate} {dueTime}
          </div>
          <div className={`text-sm font-semibold ${priorityClasses[priority]}`}>
            Priority: {priority}
          </div>
        </div>
        <button
          onClick={handleEditClick}
          className="px-2 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 ml-2"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTodo(id)}
          className="btn btn-danger px-2 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 focus-visible:bg-red-600 transition-colors duration-300 ml-2"
        >
          Delete
        </button>
      </li>
      {isEditDialogOpen && (
        <EditTodoDialog
          todo={{ id, title, dueDate, dueTime, priority, completed }}
          onSave={handleEditSave}
          onCancel={handleEditCancel}
        />
      )}
    </>
  );
}

TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  dueTime: PropTypes.string.isRequired,
  priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
};
