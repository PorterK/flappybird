import React, { useEffect, useRef } from 'react';

import { useRecoilValue, useSetRecoilState } from 'recoil';

import birdState from 'atoms/bird';
import birdPositionState from 'selectors/birdPosition';
import birdDirectionState from 'selectors/birdDirection';
import birdMovementAnimation from 'selectors/birdMovementAnimation';

import './style.css'

export default function Bird() {
  const loop = useRef();

  const bird = useRecoilValue(birdState);
  const moveY = useSetRecoilState(birdPositionState);
  const setDirection = useSetRecoilState(birdDirectionState);
  const setMovementAnimation = useSetRecoilState(birdMovementAnimation);


  const update = (bird) => () => {
    if (bird.direction === 'up') {
      if (bird.y <= bird.targetY) {
        if (bird.y > bird.targetY - 40) {
          moveY(5)
        } else {
          moveY(10)
          setMovementAnimation('up')
        }
      } else {
        setDirection('down');
      }
    }

    if (bird.direction === 'down') {
      if (bird.y > -((window.innerHeight / 2) - 115)) {
        if (bird.y > bird.targetY - 40) {
          moveY(-5);
        } else {
          moveY(-10);
          
          if (bird.y > bird.targetY - 120) {
            setMovementAnimation('down');
          }
        }
      }
    }

    loop.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    loop.current = requestAnimationFrame(update(bird));
  }, [])

  useEffect(() => {
    cancelAnimationFrame(loop.current);

    loop.current = requestAnimationFrame(update(bird));
  }, [bird]);

  return (
    <div className={`bird ${bird.animation} ${bird.movementAnimation}`} style={{ marginTop: -bird.y }} />
  )
}