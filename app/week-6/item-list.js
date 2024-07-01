"use client";

import React, { useState } from 'react';
import Item from './item';

const ItemList = ({ items }) => {
  const [sortBy, setSortBy] = useState('name');

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const sortedGroupedItems = Object.keys(groupedItems).sort().reduce((acc, category) => {
    acc[category] = groupedItems[category].sort((a, b) => a.name.localeCompare(b.name));
    return acc;
  }, {});

  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'category') {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div className="max-w-full">
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setSortBy('name')}
        >
          Sort by Name
        </button>
        <button
          className={`px-4 py-2 rounded ${sortBy === 'category' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setSortBy('category')}
        >
          Sort by Category
        </button>
        <button
          className={`px-4 py-2 rounded ${sortBy === 'group' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => setSortBy('group')}
        >
          Group by Category
        </button>
      </div>
      <ul className="space-y-4">
        {sortBy === 'group'
          ? Object.keys(sortedGroupedItems).map(category => (
              <li key={category} className="capitalize">
                <h2 className="text-2xl font-bold mt-4 text-white">{category}</h2>
                <ul>
                  {sortedGroupedItems[category].map((item, index) => (
                    <Item key={`${category}-${index}`} name={item.name} quantity={item.quantity} category={item.category} />
                  ))}
                </ul>
              </li>
            ))
          : sortedItems.map((item, index) => (
              <Item key={`${item.name}-${index}`} name={item.name} quantity={item.quantity} category={item.category} />
            ))}
      </ul>
    </div>
  );
};

export default ItemList;
