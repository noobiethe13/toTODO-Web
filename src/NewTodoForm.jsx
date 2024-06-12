import { useState } from "react"
import PropTypes from 'prop-types'

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [dueTime, setDueTime] = useState("")
  const [priority, setPriority] = useState("Medium")

  function handleSubmit(e) {
    e.preventDefault()
    if (newItem === "") return

    onSubmit({ item: newItem, dueDate, dueTime, priority })

    setNewItem("")
    setDueDate("")
    setDueTime("")
    setPriority("Medium")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form flex flex-col gap-2">
      <div className="form-row flex flex-col gap-0.5 font-bold text-2xl">
        <label htmlFor="item">New Task</label>
        <input
          className="bg-gray-200 rounded-md py-2 px-4 border-2 border-blue-800 font-medium text-base outline-none focus:outline-blue-500"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          type="text"
          id="item"
          placeholder="Enter Task Name"
        />
      </div>
      <div className="form-row flex gap-2">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-gray-200 rounded-md py-2 px-4 border-2 border-blue-800 font-medium text-base outline-none focus:outline-blue-500"
        />
        <input
          type="time"
          value={dueTime}
          onChange={(e) => setDueTime(e.target.value)}
          className="bg-gray-200 rounded-md py-2 px-4 border-2 border-blue-800 font-medium text-base outline-none focus:outline-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-gray-200 rounded-md py-2 px-4 border-2 border-blue-800 font-medium text-base outline-none focus:outline-blue-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <button className="btn px-4 py-2 rounded-full bg-blue-500 border border-black text-white font-bold text-xl hover:bg-green-400 focus-visible:bg-cyan-900/20">
        Add
      </button>
    </form>
  )
}

NewTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}