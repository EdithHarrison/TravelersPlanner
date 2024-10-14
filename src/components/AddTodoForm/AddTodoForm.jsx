import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddTodoForm.module.css';

const AddTodoForm = ({ tableName, onAddTodo, fieldOptions }) => {
  const [todoList, setTodoList] = useState('');
  const [item, setItem] = useState('');
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');
  const typeOptions = fieldOptions.Type || [];
  const budgetTrackerTypeOptions = ['Transportation', 'Accommodation', 'Food & Dining', 'Activities', 'Souvenirs', 'Misc'];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      TodoList: todoList,
      Items: item,
      Type: type,
      ...(tableName === 'BudgetTracker' && { Cost: parseFloat(cost) || 0 }),
    };
    onAddTodo(newTodo);
    setTodoList('');
    setItem('');
    setType('');
    setCost('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {tableName === 'Itinerary' && (
        <>
          <select value={type} onChange={(e) => setType(e.target.value)} className={styles.input}>
            {typeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <input
            type="text"
            value={todoList}
            onChange={(e) => setTodoList(e.target.value)}
            placeholder="Enter Todo List"
            className={styles.input}
          />
        </>
      )}
      {tableName === 'PackingList' && (
        <>
          <select value={type} onChange={(e) => setType(e.target.value)} className={styles.input}>
            {typeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter Item"
            className={styles.input}
          />
        </>
      )}
      {tableName === 'BudgetTracker' && (
        <>
          <select value={type} onChange={(e) => setType(e.target.value)} className={styles.input}>
            {budgetTrackerTypeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="Enter Item"
            className={styles.input}
          />
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter Cost"
            className={styles.input}
          />
        </>
      )}
      <button type="submit" className={styles.addButton}>ADD LIST</button>
    </form>
  );
};

AddTodoForm.propTypes = {
  tableName: PropTypes.string.isRequired,
  onAddTodo: PropTypes.func.isRequired,
  fieldOptions: PropTypes.object.isRequired,
};

export default AddTodoForm;
