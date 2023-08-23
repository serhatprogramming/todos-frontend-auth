import axios from "axios";
const API_URL = "/api/todos/";

const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getTodos };
