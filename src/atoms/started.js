import { atom } from 'recoil';

const started = atom({
  key: 'startedState',
  default: false,
});

export default started;