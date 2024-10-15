import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './TodoListItem.module.css';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TodoListItem = ({ todo, onRemoveTodo, onUpdateTodo, tableName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({ ...todo.fields, Status: todo.fields.Status || false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditableFields(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (type === 'checkbox') {
      onUpdateTodo({ id: todo.id, fields: { ...editableFields, Status: checked } });
    }
  };

  const handleSave = () => {
    onUpdateTodo({ id: todo.id, fields: editableFields });
    setIsEditing(false);
  };

  const renderFields = () => {
    if (isEditing) {
      switch (tableName) {
        case 'Itinerary':
          return (
            <>
              <input name="Day" value={editableFields.Day || ''} onChange={handleChange} className={styles.input} />
              <input name="StartTime" value={editableFields.StartTime || ''} onChange={handleChange} className={styles.input} />
              <input name="EndTime" value={editableFields.EndTime || ''} onChange={handleChange} className={styles.input} />
              <input name="TodoList" value={editableFields.TodoList || ''} onChange={handleChange} className={styles.input} />
            </>
          );
        case 'PackingList':
          return (
            <>
              <input name="Type" value={editableFields.Type || ''} onChange={handleChange} className={styles.input} />
              <input name="Items" value={editableFields.Items || ''} onChange={handleChange} className={styles.input} />
            </>
          );
        case 'BudgetTracker':
          return (
            <>
              <input name="Type" value={editableFields.Type || ''} onChange={handleChange} className={styles.input} />
              <input name="Items" value={editableFields.Items || ''} onChange={handleChange} className={styles.input} />
              <input name="Cost" value={editableFields.Cost || ''} onChange={handleChange} className={styles.input} />
            </>
          );
        default:
          return null;
      }
    } else {
      switch (tableName) {
        case 'Itinerary':
          return (
            <>
              <span className={styles.field}>{editableFields.Day}</span>
              <span className={styles.field}>{editableFields.StartTime} - {editableFields.EndTime}</span>
              <span className={styles.field}>{editableFields.TodoList}</span>
            </>
          );
        case 'PackingList':
          return (
            <>
              <span className={styles.field}>{editableFields.Type}</span>
              <span className={styles.field}>{editableFields.Items}</span>
            </>
          );
        case 'BudgetTracker':
          return (
            <>
              <span className={styles.field}>{editableFields.Type}</span>
              <span className={styles.field}>{editableFields.Items}</span>
              <span className={styles.field}>${editableFields.Cost}</span>
            </>
          );
        default:
          return null;
      }
    }
  };

  return (
    <li className={styles.listItem}>
      {renderFields()}
      <div className={styles.actions}>
        <input
          type="checkbox"
          checked={editableFields.Status || false}
          onChange={handleChange}
          name="Status"
          className={styles.checkbox}
        />
        {isEditing ? (
          <button className={styles.saveButton} onClick={handleSave}>
            <FaSave />
          </button>
        ) : (
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            <FaEdit />
          </button>
        )}
        <button className={styles.removeButton} onClick={() => onRemoveTodo(todo.id)}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.object.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  tableName: PropTypes.string.isRequired,
};

export default TodoListItem;