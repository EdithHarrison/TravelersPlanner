// airtableHelpers.js

const AIRTABLE_API_URL = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/`;
const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_TOKEN;

// Fetch data helper function
export const fetchDataFromAirtable = async (tableName) => {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}${tableName}`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Fetch field options based on an existing record
export const fetchFieldOptions = async (tableName) => {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}${tableName}`, {
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }

    const data = await response.json();
    if (data.records.length === 0) {
      return {}; // No data available
    }

    const record = data.records[0].fields; // Use the first record as a sample
    const fieldOptions = {};

    if (record.Day) {
      fieldOptions.Day = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
    }
    if (record.StartTime) {
      fieldOptions.StartTime = [
        "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
        "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM",
        "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM",
        "08:00 PM", "09:00 PM", "10:00 PM"
      ];
    }
    if (record.EndTime) {
      fieldOptions.EndTime = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
        "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
        "09:00 PM", "10:00 PM", "11:00 PM"
      ];
    }
    if (record.Type) {
      fieldOptions.Type = ["Clothing", "Documents", "Tech Gear", "Toiletries", "Transportation", "Accommodation", "Food & Dining", "Activities", "Souvenirs", "Misc"];
    }

    return fieldOptions;
  } catch (error) {
    console.error('Error fetching field options:', error);
    return {};
  }
};

export const addTodoToAirtable = async (tableName, todo) => {
    try {
      const fields = { ...todo, Status: false }; // Set default status to false (unchecked)
  
      const response = await fetch(`${AIRTABLE_API_URL}${tableName}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error adding todo: ${response.status} - ${errorResponse.error.message}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  };
  
  export const updateTodoInAirtable = async (tableName, todo) => {
    try {
      const { id, fields } = todo;
      
      // Remove fields that should not be updated
      delete fields['Task ID'];
      delete fields['CreatedAt'];
  
      const response = await fetch(`${AIRTABLE_API_URL}${tableName}/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error updating todo: ${response.status} - ${errorResponse.error.message}`);
      }
  
      const updatedTodo = await response.json();
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

// Delete Todo
export const deleteTodoFromAirtable = async (tableName, id) => {
  try {
    const response = await fetch(`${AIRTABLE_API_URL}${tableName}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting todo: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
