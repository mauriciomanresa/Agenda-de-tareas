
import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";

const TaskList = () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [renderNotice, setRenderNotice] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    setRenderNotice('"El componente ha sido renderizado."');
    const timeoutId = setTimeout(() => {
      setRenderNotice("");
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tasks]);

  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleAddTask = (taskText) => {
    const newTask = {
      id: tasks.length + 1,
      text: taskText,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="imagen">
      <div className="fondo">
        <h1>Lista de Tareas</h1>
        <TaskForm onAddTask={handleAddTask} />
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTask}
              />
            </li>
          ))}
        </ul>
        {renderNotice && <p>{renderNotice}</p>}
      </div>
    </div>
  );
};

export default TaskList;
