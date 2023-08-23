const Todo = ({ todo }) => {
  return (
    <div>
      Task: {todo.task}. Completed? {todo.done ? "Yes" : "No"}
    </div>
  );
};

export default Todo;
