import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './App.css';
import List from './List';
import AddItem from './AddItem';

function App() {
  const [list, setList] = useState([]);

  const actions = {

    addItem: (item) => {
      setList(list.concat(item));
    },

    updateItem: (newItem) => {
      setList(list.map(oldItem => oldItem.id === newItem.id
        ? newItem
        : oldItem));
    },

    removeItem: (id) => {
      setList(list.filter(item => item.id !== id));
    },

    markItem: (id) => {
      setList(
        list.map((item) => {
          if (item.id !== id) return item;
          const done = item.done == null
            ? new Date()
            : null;
          return { ...item, done };
        })
      );
    },

  };

  return (
    <div className="container">
      <h1 className="mb-3">To Do List</h1>
      <AddItem action={actions.addItem} />
      <List list={list} actions={actions} />
    </div>
  );
}

export default App;
