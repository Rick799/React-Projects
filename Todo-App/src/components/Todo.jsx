import { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

function Todo() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "Item Edited");
    } else {
      showAlert(true, "success", "Item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };

      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="w-11/12 max-w-4xl mx-auto mt-32 lg:w-full bg-slate-800 rounded-lg p-4 shadow-md shadow-slate-400 hover:shadow-slate-700">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h3 className="uppercase text-white text-xl lg:text-3xl tracking-widest mt-5 mb-14 font-semibold text-center">
          What todo
        </h3>
        <div className="flex justify-between">
          <input
            type="text"
            className="p-2 bg-yellow-50 text-lg flex-1 rounded-lg"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="submit"
            className="mx-2 text-base bg-sky-600 capitalize flex items-center tracking-widest cursor-pointer rounded-md border-2 border-sky-200 hover:bg-sky-400 hover:text-white p-2"
          >
            {isEditing ? "edit" : "Add Item"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="mt-8">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button
            className="text-lg rounded-md px-2 py-4 border-2 border-slate-500 shadow-sm  shadow-slate-300 hover:shadow-sm hover:shadow-slate-300  capitalize w-40 h-6 flex justify-center items-center mx-auto my-6 cursor-pointer text-orange-400 ease-linear duration-300 hover:text-orange-700"
            onClick={clearList}
          >
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default Todo;
