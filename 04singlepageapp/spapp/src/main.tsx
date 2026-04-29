import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TodoApp from "./TodoApp.tsx";
import App2 from "./App2.tsx";
import './App2.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
      <TodoApp />
      <App2 />
  </StrictMode>,
)
