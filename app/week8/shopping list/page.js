"use client";

import React, { useState, useEffect } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import itemsData from './items.json';
import { useUserAuth } from '../_utils/auth-context';
import { useRouter } from 'next/router';

const Page = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && !user) {
      router.push('/week-8');
    }
  }, [user, router]);

  const handleAddItem = (item) => {
    setItems([...items, item]);
  };

  const handleItemSelect = (itemName) => {
    const cleanItemName = itemName.split(',')[0].replace(/[^a-zA-Z\s]/g, '').trim();
    setSelectedItemName(cleanItemName);
  };

  if (typeof window !== 'undefined' && !user) {
    return <p className="text-white">You must be logged in to view this page. Redirecting to login...</p>;
  }

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h1 className="text-3xl font-bold text-white mb-4">Shopping List</h1>
          <NewItem onAddItem={handleAddItem} />
          <ItemList items={items} onItemSelect={handleItemSelect} />
        </div>
        <div className="w-1/2 pl-4">
          {selectedItemName && <MealIdeas ingredient={selectedItemName} />}
        </div>
      </div>
    </div>
  );
};

export default Page;