import React from 'react';

const Item = ({ name, quantity, category, onSelect, isSelected }) => {
  return (
    <li
      className={`p-2 m-4 bg-slate-900 max-w-sm cursor-pointer 
        ${isSelected ? 'bg-slate-900' : 'hover:bg-orange-800'}`}
      onClick={() => onSelect(name)}
    >
      <h2 className="text-xl font-bold text-white">{name}</h2>
      <div className="text-sm text-gray-300">Buy {quantity} in {category}</div>
    </li>
  );
};

export default Item;