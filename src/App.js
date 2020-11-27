import React, { useEffect } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import startedState from './atoms/started';
import birdAnimationState from './selectors/birdAnimation';

import './App.css';
import Bird from './components/Bird';
import Pipe from './components/Pipe';
import Ground from './components/Ground';

function App() {
  const [started, setStarted] = useRecoilState(startedState);
  const setAnimation = useSetRecoilState(birdAnimationState);

  useEffect(() => {
    document.body.addEventListener('click', () => {
      if (!started) {
        setStarted(true);
        setAnimation('flying');
      }
    });
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
