/* eslint react/prop-types: 0 */

import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article
            className="flex justify-between items-center capitalize mb-4 py-2 px-4 rounded-md ease-linear duration-300 hover:bg-slate-500 hover:text-slate-100 "
            key={id}
          >
            <p className="mb-0 tracking-widest text-white">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="cursor-pointer text-base mr-2 ease-linear duration-300 text-green-400 hover:text-green-700"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="cursor-pointer text-base mr-2 ease-linear duration-300 text-red-400 hover:text-red-800"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
