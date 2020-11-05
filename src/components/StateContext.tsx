import React, { ReactNode } from 'react';
import { State, useGlobalState } from '../state';

type StateValues = State[keyof State];

type StateContextProps = {
  stateKey: keyof State;
  children: (
    state: StateValues,
    setState: (state: StateValues) => void,
  ) => ReactNode;
};

export function StateContext({ stateKey, children }: StateContextProps) {
  const [state, setState] = useGlobalState(stateKey);
  return <>{children(state, setState)}</>;
}
