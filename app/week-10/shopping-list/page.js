"use client";

import React, { useState, useEffect } from 'react';
import NewItem from './new-item';
import ItemList from './item-list';
import MealIdeas from './meal-ideas';
import { useUserAuth } from '../_utils/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getItems, addItem } from '../_services/shopping-list-service';

useEffect(() => {
  const loadItems = async () => {
    if (user) {
      const fetchedItems = await getItems(user.uid);
      setItems(fetchedItems);
    }
  };

  loadItems();
}, [user]);

const ShoppingListPage = () => {
  const { user } = useUserAuth();
  const router = useRouter();
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/week-8');
    }
  }, [user, router]);

  const handleAddItem = async (item) => {
    if (user) {
      const newItemId = await addItem(user.uid, item);
      setItems([...items, { id: newItemId, ...item }]);
    }
  };

  const handleItemSelect = (itemName) => {
    const cleanItemName = itemName.split(',')[0].replace(/[^a-zA-Z\s]/g, '').trim();
    setSelectedItemName(cleanItemName);
  };

  if (!user) {
    return <p className="text-white">You must be logged in to view this page. Redirecting to login...</p>;
  }

  return (
    <div className="bg-slate-950 min-h-screen p-8">
      <h1 className="text-3xl font-bold text-white mb-4">Shopping List</h1>
      <div className="flex">
        <div className="w-1/2 pr-4">
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

export default ShoppingListPage;