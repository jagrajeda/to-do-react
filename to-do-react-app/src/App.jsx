import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review Code Platoon DOM lectures', completed: false },
    { id: 2, text: 'Build HTML & CSS to-do layout', completed: false }
  ])
  const [inputValue, setInputValue] = useState('')

  // Task 3.1: Add ability to add a new task
  const handleAddTask = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const newTask = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    }

    setTasks(prevTasks => [...prevTasks, newTask])
    setInputValue('')
  }

  // Task 3.2: Mark a task as completed - borrowed strikethrough from previous assignment
  const handleToggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  // Task 3.3: Delete a task - but for real this time with functioning x button
  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  return (
    <main className="todo-container">
      <header>
        <h1>My To-Do List</h1>
      </header>

      {/* Input form */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="Enter a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{
            flexGrow: 1,
            padding: '8px 12px',
            fontSize: '15px',
            borderRadius: '6px',
            border: '1px solid #bcdabf'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            fontSize: '15px',
            cursor: 'pointer',
            borderRadius: '6px',
            backgroundColor: '#1066c7',
            color: '#ffffff',
            border: 'none',
            fontWeight: 500
          }}
        >
          Add Task
        </button>
      </form>

      {/* Task list */}
      <section className="task-section">
        <ul id="task-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 0',
                borderBottom: '1px solid #4bd2e1'
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexGrow: 1 }}>
                <input
                  type="checkbox"
                  className="task-checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                />
                <span
                  className="task-text"
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#2ba3a7' : 'inherited'
                  }}
                >
                  {task.text}
                </span>
              </label>

              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  padding: '4px 8px'
                }}
                aria-label={`Delete task: ${task.text}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
export default App