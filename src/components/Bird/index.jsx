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
    if (gameOver) return;

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
      // Hacky way to remove our click/spacebar/touch events
      const bodyClone = document.body.cloneNode(true);

      document.body.parentNode.replaceChild(bodyClone, document.body);
    }
  }, [gameOver])

  useEffect(() => {
    if (started && !gameOver) {
      setAnimation('flying');
    } else {
      if (loop.current) {
        cancelAnimationFrame(loop.current);
      }
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
  }, [speed, movementAnimation]);

  useEffect(() => {
    const birdHitbox = getBirdHitbox();
    const floorHitbox = getFloorHitbox();

    if (intersect(birdHitbox, floorHitbox)) {
      setGameOver(true)
      setSpeed(0)
    }

    if (gameOver) return;

    const pipes = [...document.getElementsByClassName('pipe')];

    pipes.forEach((pipe) => {
      const pipeHitbox = getPipeHitbox(pipe);

      if (intersect(birdHitbox, pipeHitbox)) {
        console.log(pipe, birdHitbox, pipeHitbox);
        setGameOver(true)
      }
    });
  });

  return (
    <div id="bird" className={`bird ${animation} ${movementAnimation}`} style={{ top: `${yPos}px` }} />
  )
}

export default memo(Bird)