import React from 'react';
import { useGlobalState } from '../state';

export function StateContext({ stateKey, children }) {
  const [state, setState] = useGlobalState(stateKey);
  return <>{children(state, setState)}</>;
}
