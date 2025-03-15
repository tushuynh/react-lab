import { useState } from 'react';

import styles from './form.module.css';

function Form({ todos, setTodos }) {
  const [todo, setTodo] = useState({ name: '', done: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ name: '', done: false });
  };

  return (
    <form
      className={styles.todoForm}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputContainer}>
        <input
          className={styles.modernInput}
          type="text"
          name="todo"
          value={todo.name}
          onChange={(e) => setTodo({ name: e.target.value, done: false })}
          placeholder="Enter todo item..."
        />
        <button
          className={styles.modernButton}
          type="submit"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default Form;
