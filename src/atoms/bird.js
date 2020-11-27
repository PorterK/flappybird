import { atom } from 'recoil';

const birdState = atom({
  key: 'birdState',
  default: {
    x: 0,
    y: 0,
    animation: 'floating',
  },
});

export default birdState;