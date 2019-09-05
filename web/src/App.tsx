import React, { useState, useEffect } from 'react';

import './App.css';

import { Thing } from './api';
import * as api from './api';

export default function App() {
  const [things, setThings] = useState(Array<Thing>());

  function createRandomThing() {
    api.createThing().then(newThing => setThings([newThing, ...things]));
  }

  function deleteThing(id) {
    api.deleteThing(id).then(() => setThings(things.filter(t => t._id !== id)));
  }

  useEffect(() => {
    api.getThings().then(things => setThings(things));
  }, []);

  return (
    <section className="App">
      <div className="centered">
        <div>
          <h1>List of names</h1>
          <button className="add-btn" onClick={createRandomThing}>
            Add a new name
          </button>
          <ul className="things">
            {things.map(thing => (
              <li key={thing._id} className="things-item">
                <span className="name">{thing.name}</span>
                <span
                  className="icon-remove"
                  onClick={() => deleteThing(thing._id)}
                >
                  x
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
