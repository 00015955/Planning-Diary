import { useEffect, useState, useCallback } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

function App() {
  const [toDos, setToDos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [currentToDo, setCurrentToDo] = useState({ isUpdating: false, id: "" });

  const handleInputChange = (event) => setInputText(event.target.value);

  const handleAddOrUpdateToDo = () => {
    const action = currentToDo.isUpdating ? updateToDo : addToDo;
    action(
      currentToDo.isUpdating ? currentToDo.id : inputText,
      inputText,
      setToDos,
      setInputText,
      setCurrentToDo
    );
  };

  const handleUpdateMode = useCallback((_id, text) => {
    setCurrentToDo({ isUpdating: true, id: _id });
    setInputText(text);
  }, []);

  useEffect(() => {
    getAllToDo(setToDos);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo Diary</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add ToDos..."
            value={inputText}
            onChange={handleInputChange}
          />
          <button className="add" onClick={handleAddOrUpdateToDo}>
            {currentToDo.isUpdating ? "Update" : "Add"}
          </button>
        </div>
        <div className="list">
          {toDos.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => handleUpdateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDos)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
