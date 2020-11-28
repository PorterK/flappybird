import { selector } from 'recoil';

import birdState from 'atoms/bird';

const birdMovementAnimation = selector({
  key: 'birdMovementAnimation',
  get: ({ get }) => {
    return get(birdState).animation;
  },
  set: ({ get, set }, newValue) => {
    const bird = get(birdState);

    set(birdState, { ...bird, movementAnimation: newValue });
  }
});

export default birdMovementAnimation;