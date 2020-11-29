import { selector } from 'recoil';

import birdState from 'atoms/bird';

const birdSpeed = selector({
  key: 'birdSpeed',
  get: ({ get }) => {
    const bird = get(birdState);
    return bird.speed;
  },
  set: ({ get, set }, newVal) => {
    const bird = get(birdState);

    set(birdState, { ...bird, speed: newVal });
  }
});

export default birdSpeed;