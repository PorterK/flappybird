import { atom } from 'recoil';

const birdState = atom({
  key: 'birdState',
  default: {
    y: window.innerHeight / 2,
    speed: 0,
    animation: 'floating',
    direction: null,
    movementAnimation: null,
  },
});

export default birdState;