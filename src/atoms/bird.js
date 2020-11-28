import { atom } from 'recoil';

const birdState = atom({
  key: 'birdState',
  default: {
    x: 0,
    y: 0,
    targetY: 0,
    animation: 'floating',
    direction: null,
    movementAnimation: null,
  },
});

export default birdState;