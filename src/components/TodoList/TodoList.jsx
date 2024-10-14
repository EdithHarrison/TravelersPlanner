import React from 'react';
import PropTypes from 'prop-types';
import TodoListItem from '../TodoListItem/TodoListItem';
import styles from './TodoList.module.css';

const TodoList = ({ todoList, onRemoveTodo, onUpdateTodo }) => {
  return (
    <ul className={styles.list}>
      {todoList.map(todo => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onRemoveTodo={onRemoveTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      fields: PropTypes.object.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoList;