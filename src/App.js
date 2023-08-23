import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import todoService from "./services/todos";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const [userObj, setUserObj] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [task, setTask] = useState("");

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    todoService.getTodos().then((todos) => setTodos(todos));
  }, []);

  const userLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const newTodoForm = () => (
    <form onSubmit={handleNewTodo}>
      <h3>Create a new todo</h3>
      <div>
        Task
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add to the list</button>
      </div>
    </form>
  );

  const handleNewTodo = (event) => {
    event.preventDefault();
    try {
      console.log("New Todo Added to the list: ", task);
      todoService.setAuthorization(userObj.token);
      todoService.createNewTodo({ task, done: false });
      setNotification({ message: `${task} added to the list.`, type: "info" });
    } catch (error) {
      setNotification({ message: `Creation Failed`, type: "error" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setTask("");
  };

  const todoList = () => (
    <div>
      <h3>Todo List</h3>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const user = await loginService.initiateLogin({
        username,
        password,
      }); // Attempt to log in by calling a login service with provided credentials
      setUserObj(user); // Set user object in the state
      console.log("Login successful");
    } catch (exception) {
      setNotification({
        message: "Invalid login credentials",
        type: "warning",
      });
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
    setUsername(""); // Clear the username input
    setPassword(""); // Clear the password input
  };

  return (
    <div>
      <Notification notification={notification} />
      <h2>Todo Application</h2>
      {userObj && <em>Howdy, {userObj.username}!</em>}
      {userObj ? newTodoForm() : userLoginForm()}
      {todoList()}
    </div>
  );
};

export default App;
