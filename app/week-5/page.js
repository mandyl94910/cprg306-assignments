import React from 'react';
import ItemList from './item-list';

const Page = () => {
  return (
    <div className="bg-black">
      <h1 className="text-3xl font-bold pl-2 pt-2 text-white">Shopping List</h1>
      <ItemList />
    </div>
  );
};

export default Page;