# Simple Task Manager — Session 40

Minimal React + local REST API classroom project.

## Run
1. `npm install`
2. Terminal 1: `npm run api`
3. Terminal 2: `npm run dev`
4. Open the Vite local URL (usually http://localhost:5173).

## Lecture topics
- Controlled form (`useState`, `onChange`, `preventDefault`)
- `fetch` with HTTP JSON headers and `JSON.stringify`
- GET tasks, POST task, PUT task, PATCH priority, DELETE task
- `response.ok`, `try/catch/finally`, loading/success/error feedback
- Separate API code (`src/api.js`) and UI (`src/App.jsx`)
- Update list from server responses without page reload

No authentication or private tokens are needed: json-server is only a local teaching API.
