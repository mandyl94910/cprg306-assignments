"use client";

import React, { useState } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';

const Page = () => {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemSelect = (itemName) => {
    const cleanItemName = itemName.split(',')[0].replace(/[^a-zA-Z\s]/g, '').trim();
    setSelectedItemName(cleanItemName);
  };

  return (
    <div className="bg-slate-950 p-2 m-2">
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
      <div className="flex">
        <div>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div>
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </div>
  );
};

export default Page;
