import React, { useEffect, useState } from 'react';

import './App.css';
import Bird from './components/Bird';
import Pipes from './components/Pipes';
import Ground from './components/Ground';

import Game from './Game';

function App() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const handleInput = () => {
    if (!gameOver) {
      setStarted(true);
    }
  }

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      document.body.addEventListener('touchstart', handleInput);
    } else {
      document.body.addEventListener('click', handleInput);
      document.body.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
          handleInput();
        }
      })
    }
  }, []);

  return (
    <Game.Provider value={{ started, setStarted, gameOver, setGameOver }}>
      <Bird />
      <Pipes />
      <Ground moving={!gameOver} />
    </ Game.Provider>
  );
}

export default App;
