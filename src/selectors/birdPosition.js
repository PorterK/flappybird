import { selector } from 'recoil';

import birdState from 'atoms/bird';

const birdYPosition = selector({
  key: 'birdYPosition',
  get: ({ get }) => {
    const bird = get(birdState);
    return { x: bird.x, y: bird.y };
  },
  set: ({ get, set }, num) => {
    const bird = get(birdState);

    set(birdState, { ...bird, y: bird.y + num });
  }
});

export default birdYPosition;