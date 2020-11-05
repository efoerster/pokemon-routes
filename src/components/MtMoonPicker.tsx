import React from 'react';
import { useGlobalState, MtMoonExp } from '../state';

type PillProps = {
  id: string;
  children: React.ReactNode;
};

export function MtMoonPicker(): JSX.Element {
  const [mtMoonExp, setMtMoonExp] = useGlobalState('mtMoonExp');
  const handleClick = (event: React.MouseEvent) => {
    setMtMoonExp(event.currentTarget.id as MtMoonExp);
  };

  const Pill = ({ id, children }: PillProps) => {
    let className = 'pills__item';
    if (mtMoonExp === id) {
      className += ' pills__item--active';
    }

    return (
      <li id={id} onClick={handleClick} className={className}>
        {children}
      </li>
    );
  };

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
}
