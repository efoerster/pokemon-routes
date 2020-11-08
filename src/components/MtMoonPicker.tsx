import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores';
import { MtMoonExp } from '../stores/frlg';

type PillProps = {
  id: string;
  children: React.ReactNode;
};

export const MtMoonPicker = observer(() => {
  const { frlg } = useStore();
  const handleClick = (event: React.MouseEvent) => {
    frlg.pickMtMoonExp(event.currentTarget.id as MtMoonExp);
  };

  const Pill = observer(({ id, children }: PillProps) => {
    let className = 'pills__item';
    if (frlg.mtMoonExp === id) {
      className += ' pills__item--active';
    }

    return (
      <li id={id} onClick={handleClick} className={className}>
        {children}
      </li>
    );
  });

  return (
    <>
      <h3>Select your optional trainer</h3>
      <ul className="pills">
        <Pill id="robby">Bug Catcher Robby</Pill>
        <Pill id="josh">Youngster Josh</Pill>
        <Pill id="spinner">Rocket Spinner</Pill>
        <Pill id="marcos">Hiker Marcos</Pill>
      </ul>
    </>
  );
});
