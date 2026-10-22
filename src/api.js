const URL = "http://localhost:3001/tasks";
const headers = { "Content-Type": "application/json" };

async function request(path = "", options = {}) {
  const response = await fetch(URL + path, options);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  if (response.status === 204) return null;
  return response.json();
}

export const getTasks = () => request();

export const addTask = (task) => request("", {
  method: "POST", headers, body: JSON.stringify(task),
});
export const editTask = (id, task) => request(`/${id}`, {
  method: "PUT", headers, body: JSON.stringify(task),
});
export const changePriority = (id, priority) => request(`/${id}`, {
  method: "PATCH", headers, body: JSON.stringify({ priority }),
});
export const removeTask = (id) => request(`/${id}`, { method: "DELETE" });
