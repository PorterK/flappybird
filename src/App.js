import React, { useEffect, useState } from 'react';

import './App.css';
import Bird from './components/Bird';
import Pipes from './components/Pipes';
import Ground from './components/Ground';

import Game from './Game';

function App() {
  const [started, setStarted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [moving, setMoving] = useState(true);

  const handleInput = () => {
    if (!started) {
      setStarted(true);
      setHasStarted(true);
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

  useEffect(() => {
    if (hasStarted && !started) {
      setMoving(false);
    }
  }, [started]);

  return (
    <Game.Provider value={{ started, setStarted }}>
      <Bird />
      <Pipes />
      <Ground moving={moving} />
    </ Game.Provider>
  );
}

export default App;
