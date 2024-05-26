import React, { useState, useEffect } from 'react';
import './style.css'
import { AiOutlineDelete , AiOutlineEdit} from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';




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
      <div className="todo-wrapper">
        <form className='new-form' onSubmit={addItem}>
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="What's the task title?"
              />
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="What's the task description?"
              />
            </div>
            <div className="todo-input-item">
              <button
                type="submit"

                className="primaryBtn"
              >
                Add
              </button>
            </div>
          </div>
        </form>
        <h1 className='header'>Todo List</h1>
        <ul className='list'>
          {Todo.map((item, index) => (
            <li key={index}>
              <div className="todo-list-item" >
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    className="icon"
                    onClick={() => handleDelete(index)}
                    title="Delete?"
                  />
                  <BsCheckLg
                    className="check-icon"

                    title="Complete?"
                  />
                  <AiOutlineEdit className="edit"

                    title="Edit?" />
                </div>

              </div>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;

