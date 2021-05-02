import React, { useEffect, useState, useRef, useContext, memo } from 'react';

import Pipe from 'components/Pipe';
import Game from 'Game.js';
import { PIPE_SPEED } from 'constants.js';

function Pipes() {
  const loop = useRef();

  const { started, gameOver } = useContext(Game);

  const [pipes, setPipes] = useState([]);

  const update = () => {
    const mutPipes = [...pipes];

    function addPipe() {
      mutPipes.push({
        id: Date.now().toString(),
        position: Math.floor(Math.random() * 40) + 20,
      });
    }

    if (!mutPipes.length) {
      addPipe()
    } else {
      mutPipes.forEach((pipe, index) => {
        const elem = document.getElementById(pipe.id);

        if (!elem) return;

        let xPos = elem.style.left;

        if (xPos) {
          xPos = parseInt(xPos.split('px')[0]) + PIPE_SPEED;
        } else {
          xPos = window.innerWidth;
        }

        elem.style.left = `${xPos}px`;

        if (index === mutPipes.length - 1) {
          if (xPos < window.innerWidth - 350) {
            addPipe();
          } 
        }

        if (index === 0) {
          if (xPos < -150) {
            mutPipes.shift();
          }
        }
      });
    }

    setPipes(mutPipes);

    loop.current = requestAnimationFrame(update);
  }

  useEffect(() => {
    if (started && !gameOver) {
      cancelAnimationFrame(loop.current);

      loop.current = requestAnimationFrame(update);
    }
  }, [started, gameOver]);

  useEffect(() => {
    if (started & !gameOver) {
      cancelAnimationFrame(loop.current);

      loop.current = requestAnimationFrame(update);
    } else {
      cancelAnimationFrame(loop.current);
    }
  }, [pipes, started, gameOver]);

  return pipes.map((pipe) => <Pipe id={pipe.id} position={pipe.position} key={pipe.id} />);
}

export default memo(Pipes);