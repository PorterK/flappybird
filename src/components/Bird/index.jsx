import React, { useEffect, useState, useRef, useContext, memo } from 'react';

import { JUMP_SPEED, DRAG, GRAVITY } from 'constants.js';
import Game from 'Game.js';
import { getBirdHitbox, getFloorHitbox, getPipeHitbox } from 'helpers/hitbox';
import intersect from 'helpers/intersect';

import './style.css'

function Bird() {
  const loop = useRef();
  const [yPos, setYPos] = useState(window.innerHeight / 2);
  const [speed, setSpeed] = useState(0);

  const { started, gameOver, setGameOver } = useContext(Game);

  const [movementAnimation, setMovementAnimation] = useState();
  const [animation, setAnimation] = useState('floating');

  const jump = () => {
    if (gameOver) return;

    setSpeed(JUMP_SPEED);

    cancelAnimationFrame(loop.current);

    loop.current = requestAnimationFrame(update);
  }

  const update = () => {
    setSpeed((currSpeed) => currSpeed + GRAVITY * DRAG);

    loop.current = requestAnimationFrame(update);
  }

  const handleSpaceBar = (e) => {
    if (e.code === 'Space') {
      jump();
    }
  };

  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      document.body.addEventListener('touchstart', jump, true);
    } else {
      document.body.addEventListener('click', jump, true);
      document.body.addEventListener('keyup', handleSpaceBar, true);
    }
  }, []);

  useEffect(() => {
    if (gameOver) {      
      setAnimation('gameOver', () => setMovementAnimation(null));
    }
  }, [gameOver])

  useEffect(() => {
    if (started && !gameOver) {
      setAnimation('flying');
    }
  }, [started, gameOver]);

  useEffect(() => {
    setYPos((y) => y += speed);

    if (speed < 0 && movementAnimation !== 'up') {
      setMovementAnimation('up');
    }

    if (speed > 5 && movementAnimation !== 'down') {
      setMovementAnimation('down');
    }
  }, [speed, movementAnimation, gameOver]);

  useEffect(() => {
    const birdHitbox = getBirdHitbox();
    const floorHitbox = getFloorHitbox();

    if (intersect(birdHitbox, floorHitbox)) {
      setGameOver(true)
      setSpeed(0)
      cancelAnimationFrame(loop.current);
    }

    if (gameOver) return;

    const pipes = Array.from(document.getElementsByClassName('pipe'));

    pipes.forEach((pipe, index) => {
      if (pipes.length > 4 && (index  < 2 || index > 4)) return;

      const pipeHitbox = getPipeHitbox(pipe);

      if (intersect(birdHitbox, pipeHitbox)) {
        setGameOver(true);
      }
    });
  });

  const className = gameOver ? 'bird gameOver' : `bird ${animation} ${movementAnimation}`

  return (
    <div id="bird" className={className} style={{ top: `${yPos}px`, left: `${gameOver ? 'calc(45% + 40px)' : 'calc(45% - 40px)'}` }} />
  )
}

export default memo(Bird)