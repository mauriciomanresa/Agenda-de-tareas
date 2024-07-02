const TaskItem = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div>
      <span
        className="tareas"
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.text}
      </span>
      <label>
        {" (Completada)"}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
      </label>
      <br />
      <button onClick={() => onDelete(task.id)}>Eliminar</button>
    </div>
  );
};

export default TaskItem;
