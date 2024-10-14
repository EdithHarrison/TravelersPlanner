import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import styles from './InputWithLabel.module.css';

const InputWithLabel = ({ todoTitle, handleTitleChange, labelText, placeholderText }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); 
  }, []);  

  return (
    <div className={styles.inputContainer}>
      <label htmlFor="todoTitle" className={styles.label}>
        {labelText}
      </label>
      <input
        type="text"
        id="todoTitle"
        name="title"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}  
        placeholder={placeholderText}
        className={styles.input}
      />
    </div>
  );
};

// PropTypes definition
InputWithLabel.propTypes = {
  todoTitle: PropTypes.string.isRequired, 
  handleTitleChange: PropTypes.func.isRequired, 
  labelText: PropTypes.string.isRequired, 
  placeholderText: PropTypes.string.isRequired,
};

export default InputWithLabel;
