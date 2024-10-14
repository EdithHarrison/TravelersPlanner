import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo }) => {
  const { Day, StartTime, EndTime, TodoList, Items, Type, Cost, Status } = todo.fields;
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({
    Day: Day || '',
    StartTime: StartTime || '',
    EndTime: EndTime || '',
    TodoList: TodoList || '',
    Items: Items || '',
    Type: Type || '',
    Cost: Cost || '',
    Status: Status === true || Status === 'true',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditableFields({
      ...editableFields,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    onUpdateTodo({
      ...todo,
      fields: { 
        ...editableFields,
        Cost: parseFloat(editableFields.Cost) || 0,
      },
    });
    setIsEditing(false);
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked;
    onUpdateTodo({
      id: todo.id,
      fields: { Status: newStatus },
    });
  };

  return (
    <li className={styles.listItem}>
      {isEditing ? (
        <>
          {Day !== undefined && (
            <input
              type="text"
              name="Day"
              value={editableFields.Day}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          {StartTime !== undefined && (
            <input
              type="text"
              name="StartTime"
              value={editableFields.StartTime}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          {EndTime !== undefined && (
            <input
              type="text"
              name="EndTime"
              value={editableFields.EndTime}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          {Items !== undefined && (
            <input
              type="text"
              name="Items"
              value={editableFields.Items}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          {Type !== undefined && (
            <input
              type="text"
              name="Type"
              value={editableFields.Type}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          {Cost !== undefined && (
            <input
              type="number"
              name="Cost"
              value={editableFields.Cost}
              onChange={handleChange}
              className={styles.input}
            />
          )}
          <button onClick={handleSave}><FaSave /></button>
        </>
      ) : (
        <>
          <span>{TodoList}</span>
          <span>{Items}</span>
          <span>{Type}</span>
          <span>{Cost}</span>
          <input type="checkbox" checked={editableFields.Status} onChange={handleStatusChange} />
          <button onClick={() => setIsEditing(true)}><FaEdit /></button>
          <button onClick={() => onRemoveTodo(todo.id)}><FaTrash /></button>
        </>
      )}
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
