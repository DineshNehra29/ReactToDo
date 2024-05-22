import React, { useState, useEffect } from 'react';
import './style.css';

function App() {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [Todo, setTodo] = useState([]);

  // Load initial state from localStorage
  useEffect(() => {
    const storedTodo = JSON.parse(localStorage.getItem('Todo'));
    if (storedTodo) {
      setTodo(storedTodo);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('Todo', JSON.stringify(Todo));
  }, [Todo]);

  const addItem = (event) => {
    event.preventDefault(); // Prevent page refresh
    if (newTitle !== '' && newDescription !== '') {
      const newItem = {
        title: newTitle,
        description: newDescription,
      };
      setTodo([...Todo, newItem]);
      setNewTitle('');
      setNewDescription('');
    }
  };

  const handleDelete = (index) => {
    const updatedTodo = Todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
  };

  return (
    <>
      <h2>Hello</h2>
      <form className='new-form' onSubmit={addItem}>
        <div className='form-row'>
          <label htmlFor='item'>New Item</label>
          <input
            type='text'
            id='item'
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            id='description'
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button className='btn' type='submit'>
            Add
          </button>
        </div>
      </form>
      <h1 className='header'>Todo List</h1>
      <ul className='list'>
        {Todo.map((item, index) => (
          <li key={index}>
            <label>
              <input type='checkbox' />
              {item.title}
            </label>
            <p>{item.description}</p>
            <button className='del' onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

