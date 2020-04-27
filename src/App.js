import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import List from './List';
import AddItem from './AddItem';

function App() {
  const [list, setList] = useState([]);

  const actions = {

    /**
     * Add an item to the top of the list.
     * 
     * @param {Object} item
     */
    addItem: (item) => {
      setList([item].concat(list));
    },

    /**
     * Update an item in the list
     * 
     * @param {Object} newItem
     */
    updateItem: (newItem) => {
      setList(list.map(oldItem => oldItem.id === newItem.id
        ? newItem
        : oldItem));
    },

    /**
     * Remove an item from the list
     * 
     * @param {String} id
     */
    removeItem: (id) => {
      setList(list.filter(item => item.id !== id));
    },

    /**
     * Toggle the item between done and not done.
     * 
     * @param {String} id
     */
    markItem: (id) => {
      setList(
        list.map((item) => {

          // Exit if this is not the item we're looking for
          if (item.id !== id) return item;

          // `null` means not done, and a date value means done
          const done = item.done
            ? null
            : new Date();

          // Return the new item object
          return { ...item, done };

        })
      );
    },

  };

  return (
    <div className="container">
      <h1 className="title">To Do List</h1>
      <AddItem action={actions.addItem} />
      <List list={list} actions={actions} />
    </div>
  );
}

export default App;
