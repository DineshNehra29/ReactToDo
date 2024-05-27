import React, { useState, useEffect } from 'react';
import './style.css'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';




function App() {
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [Todo, setTodo] = useState([]);
  const [complete, setComplete] = useState([]);
  const [completelist, setCompletelist] = useState(false);
  const [currentEdit, setCurrentEdit] = useState('');
  const [currentEditedItem,setCurrentEditedItem] = useState("");
  

  const ifEdit = (ind, item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
    setEditTitle(item.title); // Update editTitle with the current item's title
    setEditDescription(item.description); // Update editDescription with the current item's description
  };
  

  const [editDescription, setEditDescription] = useState(currentEditedItem.description);
  const [editTitle, setEditTitle] = useState(currentEditedItem.title);

  const handleEdit = () => {
   

    if (editTitle !== '' || editDescription !== '') {
      const editItem = {
        title: editTitle,
        description: editDescription,
      };
      let newToDo = [...Todo];
      newToDo[currentEdit] = editItem;
      setTodo(newToDo);
      setCurrentEdit("");
      
    }
  }

  const handleComplete = (index) => {
    const completedItem = Todo[index]; // Get the completed item
    const updatedTodo = Todo.filter((_, i) => i !== index); // Filter out the completed item from the Todo list
    setComplete([...complete, completedItem]); // Add completed item to the completed list
    setTodo(updatedTodo); // Update the Todo list state
  };



  // Load initial state from localStorage
  useEffect(() => {
    const completeTodo = JSON.parse(localStorage.getItem('complete'));
    if (completeTodo) {
      setComplete(completeTodo);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('complete', JSON.stringify(complete));
  }, [complete]);

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

  const handleDeletecomplete = (index) => {
    const updatedcomplete = complete.filter((_, i) => i !== index);
    setComplete(updatedcomplete);
  };

  return (
    <>

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
        <div className="btn-area">
          <button
            className={`secondaryBtn ${completelist === false && 'active'}`}
            onClick={() => setCompletelist(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${completelist === true && 'active'}`}
            onClick={() => setCompletelist(true)}
          >
            Completed
          </button>
        </div >
        {completelist === false && (
          <ul >
            {Todo.map((item, index) => {
              if (currentEdit === index) {
                return (
                  <div className='edit__wrapper' key={index}>
                    <label>Update Title</label>
                    <input 
                      onChange={(e) => setEditTitle(e.target.value)}
                      value={editTitle} />
                      <label>Update Description</label>
                    <textarea 
                      rows={3}
                      onChange={(e) => setEditDescription(e.target.value)}
                      value={editDescription} />
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="primaryBtn"
                    >
                      Update
                    </button>
                  </div>
                )
              } else {
                return (
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
                          onClick={() => handleComplete(index)}
                          title="Complete?"
                        />
                        <AiOutlineEdit className="edit"
                           onClick={() => ifEdit(index,item)}
                          title="Edit?" />
                      </div>

                    </div>

                  </li>)
              }
            })}
          </ul>)}

        {completelist === true && (
          <ul >
            {complete.map((item, index) => (
              <li key={index}>
                <div className="todo-list-item" >
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <h4>Task Completed</h4>
                  </div>
                  <div>
                    <AiOutlineDelete
                      className="icon"
                      onClick={() => handleDeletecomplete(index)}
                      title="Delete?"
                    />

                  </div>

                </div>

              </li>
            ))}
          </ul>)}


      </div>
    </>
  );
}

export default App;

