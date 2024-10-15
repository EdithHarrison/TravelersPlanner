import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddTodoForm from '../AddTodoForm/AddTodoForm';
import TodoList from '../TodoList/TodoList';
import styles from './TodoContainer.module.css';
import { FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { fetchDataFromAirtable, fetchFieldOptions, addTodoToAirtable, updateTodoInAirtable, deleteTodoFromAirtable } from '../../utils/airtableHelpers';

const TodoContainer = ({ tableName }) => {
  const [todoList, setTodoList] = useState([]);
  const [fieldOptions, setFieldOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState(getSortFieldByTable(tableName));
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      try {
        const [todos, options] = await Promise.all([
          fetchDataFromAirtable(tableName),
          fetchFieldOptions(tableName)
        ]);
        setTodoList(todos);
        setFieldOptions(options);
      } catch (error) {
        console.error("Error initializing page:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, [tableName]);

  const handleAddTodo = async (newTodo) => {
    try {
      if (tableName === 'BudgetTracker' && newTodo.Cost) {
        newTodo.Cost = parseFloat(newTodo.Cost);
      }
      const addedTodo = await addTodoToAirtable(tableName, newTodo);
      setTodoList(prevList => [...prevList, addedTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleRemoveTodo = async (id) => {
    try {
      await deleteTodoFromAirtable(tableName, id);
      setTodoList(prevList => prevList.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error removing todo:", error);
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      if (tableName === 'BudgetTracker' && updatedTodo.fields.Cost) {
        updatedTodo.fields.Cost = parseFloat(updatedTodo.fields.Cost);
      }
      const updated = await updateTodoInAirtable(tableName, updatedTodo);
      setTodoList(prevList => prevList.map(todo => todo.id === updated.id ? updated : todo));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  function getSortFieldByTable(table) {
    switch (table) {
      case 'Itinerary': return 'Day';
      case 'PackingList': return 'Type';
      case 'BudgetTracker': return 'Type';
      default: return 'Day';
    }
  }

  function getSortableFields(table) {
    switch (table) {
      case 'Itinerary': return ['Day', 'StartTime', 'EndTime', 'TodoList'];
      case 'PackingList': return ['Type', 'Items'];
      case 'BudgetTracker': return ['Type', 'Items', 'Cost'];
      default: return [];
    }
  }

  const sortTodos = (todosToSort) => {
    if (!Array.isArray(todosToSort) || todosToSort.length === 0) {
      return [];
    }
    return [...todosToSort].sort((a, b) => {
      const fieldA = a.fields[sortField] || '';
      const fieldB = b.fields[sortField] || '';

      if (sortField === 'StartTime' || sortField === 'EndTime') {
        return sortOrder === 'asc'
          ? new Date(`1970/01/01 ${fieldA}`) - new Date(`1970/01/01 ${fieldB}`)
          : new Date(`1970/01/01 ${fieldB}`) - new Date(`1970/01/01 ${fieldA}`);
      }

      if (sortField === 'Cost') {
        return sortOrder === 'asc'
          ? parseFloat(fieldA) - parseFloat(fieldB)
          : parseFloat(fieldB) - parseFloat(fieldA);
      }

      return sortOrder === 'asc'
        ? String(fieldA).localeCompare(String(fieldB))
        : String(fieldB).localeCompare(String(fieldA));
    });
  };

  const sortedTodos = sortTodos(todoList);
  const totalPages = Math.ceil(sortedTodos.length / 10);
  const getCurrentTodos = () => {
    const startIndex = (currentPage - 1) * 10;
    return sortedTodos.slice(startIndex, startIndex + 10);
  };

  const toggleSortOrder = () => setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <AddTodoForm
        onAddTodo={handleAddTodo}
        tableName={tableName}
        fieldOptions={fieldOptions}
      />

      <div className={styles.sortControls}>
        <button className={styles.toggleButton} onClick={toggleSortOrder}>
          {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </button>

        <div className={styles.sortFieldContainer}>
          <label className={styles.label} htmlFor="sortField">Sort by:</label>
          <select
            id="sortField"
            className={styles.dropdown}
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            {getSortableFields(tableName).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <TodoList
        todoList={getCurrentTodos()}
        onRemoveTodo={handleRemoveTodo}
        onUpdateTodo={handleUpdateTodo}
        tableName={tableName}
      />

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePage : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string.isRequired,
};

export default TodoContainer;