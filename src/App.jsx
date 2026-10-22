import { useEffect, useState } from "react";
import { getTasks, addTask, editTask, changePriority, removeTask } from "./api";
import "./App.css";

export default function App() {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("low");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
 
  useEffect(() => {
    getTasks()
      .then(setTasks)
      .catch((err) => setError(err.message));
  }, []);

  // The same loading, success, and error steps for each API request.
  async function run(action, message) {
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await action();
      setSuccess(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function submit(e) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please enter a task title.");
      return;
    }
    run(async () => {
      const task = await addTask({ title: title.trim(), priority });
      setTasks((old) => [task, ...old]);
      setTitle("");
      setPriority("low");
    }, "Task added!");
  }

  function edit(task) {
    const newTitle = prompt("New task title:", task.title);
    if (newTitle === null) return;
    if (!newTitle.trim()) {
      setError("Title cannot be empty.");
      return;
    }
    run(async () => {
      const updated = await editTask(task.id, {
        title: newTitle.trim(),
        priority: task.priority,
      });
      setTasks((old) => old.map((t) => (t.id === task.id ? updated : t)));
    }, "Task updated!");
  }

  function toggle(task) {
    const next = task.priority === "low" ? "high" : "low";
    run(async () => {
      const updated = await changePriority(task.id, next);
      setTasks((old) => old.map((t) => (t.id === task.id ? updated : t)));
    }, "Priority changed!");
  }

  function remove(id) {
    run(async () => {
      await removeTask(id);
      setTasks((old) => old.filter((t) => t.id !== id));
    }, "Task deleted!");
  }

  return (
    <main className="app">
      <h1>Task Manager</h1>
      <p>React + API practice</p>

      <form onSubmit={submit}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={loading}
        >
          <option value="low">Low</option>
          <option value="high">High</option>
        </select>
        <button disabled={loading}>{loading ? "Please wait..." : "Add"}</button>
      </form>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}
      {success && (
        <p className="success" role="status">
          {success}
        </p>
      )}

      <h2>Tasks</h2>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <span>
            {task.title} — {task.priority}
          </span>
          <div className="buttons">
            <button disabled={loading} onClick={() => edit(task)}>
              Edit
            </button>
            <button disabled={loading} onClick={() => toggle(task)}>
              Priority
            </button>
            <button disabled={loading} onClick={() => remove(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      {!tasks.length && !error && <p>No tasks yet.</p>}
    </main>
  );
}
