import React, { useState, useEffect } from 'react';
import TodoContainer from '../components/TodoContainer';
import bannerImage from '../assets/home-banner.svg';
import { fetchDataFromAirtable, fetchFieldOptions } from '../utils/airtableHelpers';

function BudgetTracker() {
  const [todoList, setTodoList] = useState([]);
  const [fieldOptions, setFieldOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const tableName = "BudgetTracker";

  useEffect(() => {
    const initPage = async () => {
      const todos = await fetchDataFromAirtable(tableName);
      setTodoList(todos);
      const options = await fetchFieldOptions(tableName);
      setFieldOptions(options);
      setIsLoading(false);
    };
    initPage();
  }, []);

  return (
    <div className="page">
      <div className="banner" style={{ backgroundImage: `url(${bannerImage})` }}>
        <h1>Budget Tracker</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoContainer todoList={todoList} tableName={tableName} fieldOptions={fieldOptions} />
      )}
    </div>
  );
}

export default BudgetTracker;