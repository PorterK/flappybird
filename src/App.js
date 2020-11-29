import React, { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import startedState from './atoms/started';
import birdAnimationState from './selectors/birdAnimation';
import birdDirectionState from './selectors/birdDirection';
import birdSpeedState from './selectors/birdSpeed';

import './App.css';
import Bird from './components/Bird';
import Pipe from './components/Pipe';
import Ground from './components/Ground';

import { JUMP_SPEED } from './constants';

function App() {
  const [started, setStarted] = useRecoilState(startedState);
  const setAnimation = useSetRecoilState(birdAnimationState);
  const setDirection = useSetRecoilState(birdDirectionState);
  const setSpeed = useSetRecoilState(birdSpeedState);

  const handleInput = () => {
    if (!started) {
      setStarted(true);
      setAnimation('flying');
    }

    setSpeed(JUMP_SPEED);
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
    <>
      <Bird />
      <Pipe />
      <Ground />
    </>
  );
}

export default App;
