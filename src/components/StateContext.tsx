import { observer } from 'mobx-react-lite';
import React, { ReactNode } from 'react';
import { StateStore, useStore } from '../stores';

type StateContextProps = {
  children: (state: StateStore) => ReactNode;
};

export const StateContext = observer(({ children }: StateContextProps) => {
  const state = useStore();
  return <>{children(state)}</>;
});
