import React, { useEffect, useState } from 'react';

import './App.css';
import Bird from './components/Bird';
import Pipe from './components/Pipe';
import Ground from './components/Ground';

import Game from './Game';

function App() {
  const [started, setStarted] = useState(false);

  const handleInput = () => {
    if (!started) {
      setStarted(true);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', handleInput);
    document.body.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        handleInput();
      }
    })
  }, []);

  return (
    <Game.Provider value={{ started }}>
      <Bird />
      <Pipe />
      <Ground />
    </ Game.Provider>
  );
}

export default App;
