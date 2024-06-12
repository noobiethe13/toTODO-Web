import { useState } from 'react';
import PropTypes from 'prop-types';

const EditTodoDialog = ({ todo, onSave, onCancel }) => {
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate);
  const [editedDueTime, setEditedDueTime] = useState(todo.dueTime);
  const [editedPriority, setEditedPriority] = useState(todo.priority);

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setEditedDueDate(e.target.value);
  };

  const handleDueTimeChange = (e) => {
    setEditedDueTime(e.target.value);
  };

  const handlePriorityChange = (e) => {
    setEditedPriority(e.target.value);
  };

  const handleSave = () => {
    onSave({
      id: todo.id,
      title: editedTitle,
      dueDate: editedDueDate,
      dueTime: editedDueTime,
      priority: editedPriority,
      completed: todo.completed,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-full md:w-3/4 lg:w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-2">
            Task Name
          </label>
          <input
            type="text"
            id="title"
            value={editedTitle}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueDate" className="block font-bold mb-2">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={editedDueDate}
            onChange={handleDueDateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dueTime" className="block font-bold mb-2">
            Due Time
          </label>
          <input
            type="time"
            id="dueTime"
            value={editedDueTime}
            onChange={handleDueTimeChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="priority" className="block font-bold mb-2">
            Priority
          </label>
          <select
            id="priority"
            value={editedPriority}
            onChange={handlePriorityChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 mr-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

EditTodoDialog.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    dueTime: PropTypes.string.isRequired,
    priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditTodoDialog;