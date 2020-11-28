import { selector } from 'recoil';

import birdState from 'atoms/bird';

const birdAnimationState = selector({
  key: 'birdDirectionState',
  get: ({ get }) => {
    return get(birdState).direction;
  },
  set: ({ get, set }, newValue) => {
    const bird = get(birdState);

    set(birdState, { ...bird, direction: newValue, targetY: newValue === 'up' ? bird.y + 100 : bird.targetY });
  }
});

export default birdAnimationState;