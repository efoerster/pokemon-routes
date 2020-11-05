import { createGlobalState } from 'react-hooks-global-state';

export type Nature = 'rash' | 'mild' | 'modest';
export type MtMoonExp = 'robby' | 'josh' | 'spinner' | 'marcos';
export type Starter = {
  nature: Nature;
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
};

export type State = {
  starter: Starter;
  mtMoonExp: MtMoonExp;
};

export const { useGlobalState } = createGlobalState<State>({
  starter: {
    nature: 'rash',
    hp: 31,
    atk: 31,
    def: 31,
    spa: 31,
    spd: 31,
    spe: 31,
  },
  mtMoonExp: 'robby',
});
