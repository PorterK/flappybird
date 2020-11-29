import { selector } from 'recoil';

import birdState from 'atoms/bird';

const birdYPosition = selector({
  key: 'birdYPosition',
  get: ({ get }) => {
    const bird = get(birdState);
    return bird.y;
  },
  set: ({ get, set }, newVal) => {
    const bird = get(birdState);

    set(birdState, { ...bird, y: newVal });
  }
});

export default birdYPosition;