import axios from "axios";
const API_URL = "/api/todos/";

let authorization = null;

const setAuthorization = (token) => {
  authorization = {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createNewTodo = async (newTodoObject) => {
  const response = await axios.post(API_URL, newTodoObject, authorization);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getTodos, setAuthorization, createNewTodo };
