import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [newItem, setnewItem] = useState("");
  let saved
  if(localStorage.getItem('saved')){
    saved = JSON.parse(localStorage.getItem('saved'))
  }else {
    saved = []
  }
  const [allTodos, setAllTodos] = useState(saved);
  
  useEffect(() => {
    console.log(allTodos)
    localStorage.setItem("saved", JSON.stringify(allTodos));
  },[allTodos])
  

  function addItem() {
    if (newItem) {
      setAllTodos([...allTodos, newItem]);
    }
    setnewItem("")
  }
  function handlePress(e) {
    if (e.keyCode === 13) {
      addItem();
    }
  }
  return (
    <div className="app">
      <h1 className="header">Todo App</h1>
      <div className="input-area">
        <input
          type="text"
          className="input"
          placeholder="Add Task"
          value={newItem}
          onKeyDown={handlePress}
          onChange={(e) => {
            setnewItem(e.target.value);
          }}
        />
        <button type="submit" className="add-todo-btn" onClick={addItem}>
          +
        </button>
      </div>

      <ul className="all-todos">
        {allTodos.map((item, index) => {
          return (
            <li key={index}>
              <div className="item">{item}</div>
              <span
                onClick={() => {
                  setAllTodos(
                    allTodos.filter((element) => element !== allTodos[index])
                    );
                }}
              >
                <AiFillDelete />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
