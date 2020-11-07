import { StarterStore } from './starter';
import { FRLGStore } from './frlg';
import { createContext, useContext } from 'react';

export class StateStore {
  starter = new StarterStore();
  frlg = new FRLGStore();
}

const StateContext = createContext(new StateStore());

export const useStore = (): StateStore => useContext(StateContext);
