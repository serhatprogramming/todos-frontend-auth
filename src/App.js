import { useState, useEffect } from "react";
import Todo from "./components/Todo";
import todoService from "./services/todos";
import loginService from "./services/loginService";
import Notification from "./components/Notification";
import UserLoginForm from "./components/UserLoginForm";
import NewTodoForm from "./components/NewTodoForm";
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
  // check userData in LS and update userObj accordingly
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserObj(JSON.parse(storedUserData));
    }
  }, []);

  const handleNewTodo = async (event) => {
    event.preventDefault();
    try {
      todoService.setAuthorization(userObj.token);
      const newTodo = await todoService.createNewTodo({ task, done: false });
      setTodos([...todos, newTodo]);
      setNotification({ message: `${task} added to the list.`, type: "info" });
    } catch (error) {
      setNotification({ message: `Creation Failed`, type: "error" });
    }
    setTimeout(() => {
      setNotification(null);
    }, 10000);
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
      // Store user data in Local Storage
      localStorage.setItem("userData", JSON.stringify(user));
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

  const handleLogout = () => {
    // Clear userObj state and Local Storage
    setUserObj(null); // Clear userObj state
    localStorage.removeItem("userData"); // Remove userData from Local Storage
  };

  const greetingAndLogout = () => (
    <>
      <em>Howdy, {userObj.username}! </em>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );

  return (
    <div>
      <Notification notification={notification} />
      <h2>Todo Application</h2>
      {userObj && greetingAndLogout()}
      {userObj ? (
        <NewTodoForm
          handleNewTodo={handleNewTodo}
          task={task}
          setTask={setTask}
        />
      ) : (
        <UserLoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {todoList()}
    </div>
  );
};

export default App;
