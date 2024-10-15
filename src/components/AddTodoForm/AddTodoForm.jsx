import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './AddTodoForm.module.css';

const AddTodoForm = ({ tableName, onAddTodo, fieldOptions }) => {
  const [formData, setFormData] = useState({
    Day: '',
    StartTime: '',
    EndTime: '',
    TodoList: '',
    Type: '',
    Items: '',
    Cost: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (tableName === 'Itinerary') {
      if (!formData.Day) newErrors.Day = 'Day is required';
      if (!formData.StartTime) newErrors.StartTime = 'Start Time is required';
      if (!formData.EndTime) newErrors.EndTime = 'End Time is required';
      if (!formData.TodoList) newErrors.TodoList = 'Todo List is required';
    } else if (tableName === 'PackingList') {
      if (!formData.Type) newErrors.Type = 'Type is required';
      if (!formData.Items) newErrors.Items = 'Items are required';
    } else if (tableName === 'BudgetTracker') {
      if (!formData.Type) newErrors.Type = 'Type is required';
      if (!formData.Items) newErrors.Items = 'Items are required';
      if (!formData.Cost) newErrors.Cost = 'Cost is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const newTodo = { ...formData };
    
    if (tableName === 'Itinerary') {
      delete newTodo.Type;
      delete newTodo.Items;
      delete newTodo.Cost;
    } else if (tableName === 'PackingList') {
      delete newTodo.Day;
      delete newTodo.StartTime;
      delete newTodo.EndTime;
      delete newTodo.TodoList;
      delete newTodo.Cost;
    } else if (tableName === 'BudgetTracker') {
      delete newTodo.Day;
      delete newTodo.StartTime;
      delete newTodo.EndTime;
      delete newTodo.TodoList;
      newTodo.Cost = parseFloat(newTodo.Cost);
    }

    onAddTodo(newTodo);
    setFormData({
      Day: '',
      StartTime: '',
      EndTime: '',
      TodoList: '',
      Type: '',
      Items: '',
      Cost: '',
    });
    setErrors({});
  };

  const renderField = (name, element) => (
    <div className={styles.fieldContainer}>
      {element}
      {errors[name] && <div className={styles.errorMessage}>{errors[name]}</div>}
    </div>
  );

  const renderFields = () => {
    switch (tableName) {
      case 'Itinerary':
        return (
          <>
            {renderField('Day', 
              <select name="Day" value={formData.Day} onChange={handleChange} className={styles.input}>
                <option value="">Select Day</option>
                {fieldOptions.Day?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {renderField('StartTime', 
              <select name="StartTime" value={formData.StartTime} onChange={handleChange} className={styles.input}>
                <option value="">Start Time</option>
                {fieldOptions.StartTime?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {renderField('EndTime', 
              <select name="EndTime" value={formData.EndTime} onChange={handleChange} className={styles.input}>
                <option value="">End Time</option>
                {fieldOptions.EndTime?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {renderField('TodoList', 
              <input
                type="text"
                name="TodoList"
                value={formData.TodoList}
                onChange={handleChange}
                placeholder="Enter Todo List"
                className={styles.input}
              />
            )}
          </>
        );
      case 'PackingList':
        return (
          <>
            {renderField('Type', 
              <select name="Type" value={formData.Type} onChange={handleChange} className={styles.input}>
                <option value="">Select Type</option>
                {fieldOptions.Type?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {renderField('Items', 
              <input
                type="text"
                name="Items"
                value={formData.Items}
                onChange={handleChange}
                placeholder="Enter Item"
                className={styles.input}
              />
            )}
          </>
        );
      case 'BudgetTracker':
        return (
          <>
            {renderField('Type', 
              <select name="Type" value={formData.Type} onChange={handleChange} className={styles.input}>
                <option value="">Select Type</option>
                {['Transportation', 'Accommodation', 'Food & Dining', 'Activities', 'Souvenirs', 'Misc'].map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            )}
            {renderField('Items', 
              <input
                type="text"
                name="Items"
                value={formData.Items}
                onChange={handleChange}
                placeholder="Enter Item"
                className={styles.input}
              />
            )}
            {renderField('Cost', 
              <input
                type="number"
                name="Cost"
                value={formData.Cost}
                onChange={handleChange}
                placeholder="Enter Cost"
                className={styles.input}
              />
            )}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-table={tableName}>
      {renderFields()}
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