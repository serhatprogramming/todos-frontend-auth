const NewTodoForm = ({ handleNewTodo, task, setTask }) => (
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

export default NewTodoForm;
