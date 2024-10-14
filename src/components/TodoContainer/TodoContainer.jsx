import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import styles from './TodoContainer.module.css';

const TodoContainer = ({ tableName, onAddTodo, onUpdateTodo, onRemoveTodo, todoList, fieldOptions }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); // Assuming data is passed in
  }, [todoList]);

  return (
    <div className={styles.container}>
      <h1>{tableName}</h1>
      <AddTodoForm tableName={tableName} onAddTodo={onAddTodo} fieldOptions={fieldOptions} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} />
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
  onAddTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  todoList: PropTypes.array.isRequired,
  fieldOptions: PropTypes.object.isRequired,
};

export default TodoContainer;
