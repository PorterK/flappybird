import React, { useEffect, useRef, memo } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import { DRAG, GRAVITY } from 'constants.js';
import birdState from 'atoms/bird';
import startedState from 'atoms/started';
import birdPositionState from 'selectors/birdPosition';
import birdSpeedState from 'selectors/birdSpeed';
import birdMovementAnimation from 'selectors/birdMovementAnimation';

import './style.css'

function Bird() {
  const loop = useRef();
  const birdRef = useRef();

  const bird = useRecoilValue(birdState);
  const started = useRecoilValue(startedState);
  const setY = useSetRecoilState(birdPositionState);
  const setSpeed = useSetRecoilState(birdSpeedState);
  const setMovementAnimation = useSetRecoilState(birdMovementAnimation);


  const update = (started, bird) => () => {
    if (started) {
      let speed = bird.speed;

      speed += GRAVITY;
      speed *= DRAG;

      if (speed < 0 && bird.movementAnimation != 'up') {
        setMovementAnimation('up');
      }

      if (speed > 5 && bird.movementAnimation != 'down') {
        setMovementAnimation('down');
      }

      setSpeed(speed);
  
      setY(bird.y + speed);
    }

    loop.current = requestAnimationFrame(update(started, bird));
  }

  useEffect(() => {
    loop.current = requestAnimationFrame(update(bird));
  }, [])

  useEffect(() => {
    cancelAnimationFrame(loop.current);

    loop.current = requestAnimationFrame(update(started, bird));
  }, [started, bird]);

  return (
    <div ref={birdRef} className={`bird ${bird.animation} ${bird.movementAnimation}`} style={{ top: `${bird.y}px` }} />
  )
}

export default memo(Bird)