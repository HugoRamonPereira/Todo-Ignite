import { useState, useEffect, useRef } from "react";
import "../styles/tasklist.scss";
import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // e.preventDefault();
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle) return;
    // if (newTaskTitle === "") return;

    const newTask = {
      //Generate a random ID ranging between 1 and 10000 OBS: Not a good practice
      id: Math.ceil(Math.random() * 10000),
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((tasks) => [...tasks, newTask]);
    setNewTaskTitle("");
  }

  // const handleEnterKeySubmit = (e:any) => {
  //   if(e.keyCode === 13) {
  //     return;
  //   }
  // } 

  function handleToggleTaskCompletion(id: number) {
    // Switch from 'true' to 'false' the field 'isComplete' of a task with the given ID
    const checkedTask = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            isComplete: !task.isComplete,
          }
        : task
    );
    setTasks(checkedTask);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const deletedTask = tasks.filter((task) => task.id !== id);
    setTasks(deletedTask);
  }

  // const inputRef: any = useRef(null);

  // useEffect(() => {
  //   inputRef.current.focus();
  // });

  return (
    <section className="task-list container">
      <header>
        <h2>My daily tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Add new to-do"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
            // onKeyPress={handleEnterKeySubmit}
            // ref={inputRef}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
