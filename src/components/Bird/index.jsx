import React, { useEffect, useState, useRef, useContext, memo } from 'react';

import { JUMP_SPEED, DRAG, GRAVITY } from 'constants.js';
import Game from 'Game.js';
import { getBirdHitbox, getFloorHitbox } from 'helpers/hitbox';
import intersect from 'helpers/intersect';

import './style.css'

function Bird() {
  const loop = useRef();

  const { started, setGameOver } = useContext(Game);

  const [movementAnimation, setMovementAnimation] = useState();
  const [animation, setAnimation] = useState('floating');

  let bird = { y: window.innerHeight / 2, speed: 0 };

  let gameOver = false;

  const jump = () => {
    if (gameOver) return;

    bird.speed = JUMP_SPEED;

    cancelAnimationFrame(loop.current);

    loop.current = requestAnimationFrame(update);
  }

  const update = () => {
    if (gameOver) return;

    bird.speed += GRAVITY;
    bird.speed *= DRAG;

    bird.y += bird.speed;

    const birdHitbox = getBirdHitbox();
    const floorHitbox = getFloorHitbox();

    if (intersect(birdHitbox, floorHitbox)) {
      gameOver = true;
    }

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
    document.body.addEventListener('click', jump, true);
    document.body.addEventListener('keyup', (e) => {
      if (e.code === 'Space') {
        jump();
      }
    }, true);
  }, []);

  useEffect(() => {
    if (started) {
      setAnimation('flying');
    } else {
      if (loop.current) {
        cancelAnimationFrame(loop.current);
      }
    }
  }, [started]);

  return (
    <div id="bird" className={`bird bird-hitbox ${animation} ${movementAnimation}`} style={{ top: `${bird.y}px` }} />
  )
}

export default memo(Bird)