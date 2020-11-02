import { createGlobalState } from 'react-hooks-global-state';

export const { useGlobalState } = createGlobalState({
  starter: {
    nature: 'Rash',
    hp: 31,
    atk: 31,
    def: 31,
    spa: 31,
    spd: 31,
    spe: 31,
  },
  mtMoonExp: 'robby',
});
