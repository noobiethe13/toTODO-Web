import PropTypes from 'prop-types';
import { TodoItem } from "./TodoItem";

export function TodoList({ todos, toggleTodo, deleteTodo }) {
  const sortedTodos = todos.slice().sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <ul className="list flex flex-col gap-5 pl-4">
      {todos.length === 0 && "No Tasks"}
      {sortedTodos.map(todo => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        )
      })}
    </ul>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Update to string type
      title: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired, // Add dueDate prop type
      dueTime: PropTypes.string.isRequired, // Add dueTime prop type
      priority: PropTypes.oneOf(['High', 'Medium', 'Low']).isRequired, // Add priority prop type
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired
};