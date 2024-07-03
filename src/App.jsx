import { useEffect, useState } from "react";

import "./App.css";
import { TodoProvider, useTodo } from "./context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };
  const udpatdeTodo = (id, todo) => {
    setTodos((prev) => prev.map((e) => (e.id === id ? todo : e)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e))
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //+++++++++++++++++++
    
  //+++++++++++++++++++
  return (
    <TodoProvider
      value={{ todos, addTodo, udpatdeTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-[#172842] py-8">
        <div className="mx-auto w-full max-w-2xl rounded-lg px-4 py-3 text-white shadow-md">
          <h1 className="text-center text-2xl mb-8 font-bold">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {" "}
            <TodoForm />{" "}
          </div>
          <div className="flex flex-wrap gap-y-3 container">
            {/*Loop and Add TodoItem here */}
            {todos.map((e) => (
              <div
                key={e.id}
             
                className="w-full "
              >
                <TodoItem todo={e} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
