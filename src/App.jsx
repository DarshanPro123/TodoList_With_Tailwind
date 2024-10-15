import { useEffect, useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { toast, Slide, ToastContainer } from "react-toastify";

//for localstorage data get to lists
const getData = () => {
  const data = localStorage.getItem("Tasks");
  if (data) return JSON.parse(data);
  return [];
};
function App() {
  const [inputValue, setInputValue] = useState("");

  //getData from LocalStorage
  const [lists, setLists] = useState(getData());
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
      setInputValue("");
      toast.info("List is Update SucessFully");
      return;
    }
    //checking list are same or not
    if (lists.includes(inputValue)) return toast.warn("Task already exists 🦹🏻‍♂️");

    setLists((previous) => [...previous, inputValue]);
    toast.success("Task added successfully");
    setInputValue("");
  };

  const handleDelete = (task) => {
    const newLists = lists.filter((i) => i !== task);
    toast.error("Task deleted successfully");
    setLists(newLists);
  };

  const handleUpdate = (list, index) => {
    setInputValue(list);
    setUpdateIndex(index);
  };

  const handleDelteAll = () => {
    if (lists) {
      setLists([]);
      toast.error("All task are deleted");
      return;
    }

    if (!lists) {
      toast.error("List is already Empty!!");
    }
  };

  // Save lists in localStorage
  useEffect(() => {
    localStorage.setItem("Tasks", JSON.stringify(lists));
  }, [lists]);
  // gradient-to-b from-orange-400 via-gray-800 to-green-600
  return (
    <div className="h-screen bg-gray-800 text-red-400">
      <h1 className="text-[2.7rem]  text-red-500 text-center font-semibold p-4  ">
        Todo-list 📝
      </h1>
      <form className="flex justify-center" onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-1/2 p-2  mx-0 border text-[1.2rem] text-red-500 "
          placeholder="Enter your task"
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          required
          autoComplete="off"
        />
        <button className="bg-orange-500 text-stone-100 font-semibold w-28 px-5 py-3  mx-0 rounded">
          {updateIndex !== null ? "Edit" : "Add"}
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
        <button
          onClick={handleDelteAll}
          className="bg-orange-500 text-white font-semibold px-10 py-3 rounded-lg m-1"
        >
          Delete All
        </button>
      </ul>
      <ToastContainer
        position="bottom-right"
        pauseOnHover={false}
        autoClose={2000}
        hideProgressBar={true}
        theme="colored"
        transition={Slide}
      />
    </div>
  );
}

export default App;
