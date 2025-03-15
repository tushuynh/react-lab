import styles from './todoItem.module.css';

const TodoItem = ({ item, todos, setTodos }) => {
  const deleteItem = (item) => {
    setTodos(todos.filter((todo) => todo.name !== item));
  };

  const handleClick = (name) => {
    setTodos(
      todos.map((todo) =>
        todo.name === name ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        <span
          onClick={() => handleClick(item.name)}
          className={item.done ? styles.completed : ''}
        >
          {item.name}
        </span>
        <span>
          <button
            onClick={() => deleteItem(item.name)}
            className={styles.deleteButton}
          >
            x
          </button>
        </span>
      </div>

      <hr className={styles.itemLine} />
    </div>
  );
};

export default TodoItem;
