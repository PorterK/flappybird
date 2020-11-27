import { selector } from 'recoil';

import birdState from '../atoms/bird';

const birdAnimationState = selector({
  key: 'birdAnimationState',
  get: ({ get }) => {
    return get(birdState).animation;
  },
  set: ({ get, set }, newValue) => {
    const bird = get(birdState);

    set(birdState, { ...bird, animation: newValue });
  }
});

export default birdAnimationState;