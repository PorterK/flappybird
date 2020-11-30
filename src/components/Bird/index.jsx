import React, { useEffect, useState, useRef, useContext, memo } from 'react';

import { JUMP_SPEED, DRAG, GRAVITY } from 'constants.js';
import Game from 'Game.js';

import './style.css'

function Bird() {
  const loop = useRef();

  const { started } = useContext(Game);

  const [movementAnimation, setMovementAnimation] = useState();
  const [animation, setAnimation] = useState('floating');

  let bird = { y: window.innerHeight / 2, speed: 0 };

  const jump = () => {
    bird.speed = JUMP_SPEED;

    cancelAnimationFrame(loop.current);

    loop.current = requestAnimationFrame(update);
  }

  const update = () => {
    bird.speed += GRAVITY;
    bird.speed *= DRAG;

    bird.y += bird.speed;

    if (bird.speed < 0 && movementAnimation !== 'up') {
      setMovementAnimation('up');
    }

    if (bird.speed > 5 && movementAnimation !== 'down') {
      setMovementAnimation('down');
    }

    const element = document.getElementById('bird');

    element.style.top = `${bird.y}px`;

    loop.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    document.body.addEventListener('click', jump);
    document.body.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        jump();
      }
    })
  }, [])

  useEffect(() => {
    if (started) {
      bird.speed = JUMP_SPEED;

      setAnimation('flying');

      loop.current = requestAnimationFrame(update);
    }
  }, [started]);

  return (
    <div id="bird" className={`bird ${animation} ${movementAnimation}`} style={{ top: `${bird.y}px` }} />
  )
}

export default memo(Bird)