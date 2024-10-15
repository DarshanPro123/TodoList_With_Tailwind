import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [lists, setLists] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (updateIndex !== null) {
      const updatedLists = lists.map((item, index) =>
        index === updateIndex ? inputValue : item
      );
      setLists(updatedLists);
      setUpdateIndex(null);
    } else {
      //checking list are same or not
      if (lists.includes(inputValue)) return alert("Its same");
      setLists((previous) => [...previous, inputValue]);
    }
    setInputValue("");
  };

  const handleDelete = (task) => {
    const newLists = lists.filter((i) => i !== task);
    setLists(newLists);
  };

  const handleUpdate = (list, index) => {
    setInputValue(list);
    setUpdateIndex(index);
  };

  return (
    <div className="h-screen bg-gradient-to-b from-orange-400 via-gray-300 to-green-600 text-red-400">
      <h1 className="text-[1.7rem] text-red-500 text-center font-semibold p-4 rounded">
        Todo-list 📝
      </h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-1/2 p-2 m-2 border text-[1.2rem] text-red-500 rounded"
          placeholder="Enter your task"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          required
          autoComplete="off"
        />
        <button className="bg-orange-500 text-stone-100 font-semibold p-3 m-2 rounded">
          {updateIndex !== null ? "Update" : "Add"}
        </button>
      </form>

      <ul className="flex m-5 flex-col items-center">
        {lists.map((list, i) => {
          return (
            <li
              key={i}
              className="w-1/2 flex justify-between p-2 text-[1.2rem] m-2 border border-red-500 rounded"
            >
              <span className="first-letter:uppercase">{list}</span>
              <div className="flex gap-2 cursor-pointer">
                <span onClick={() => handleUpdate(list, i)}>🖋️</span>
                <span
                  onClick={() => handleDelete(list)}
                  className="cursor-pointer"
                >
                  🗑️
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
