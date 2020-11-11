import { observer } from 'mobx-react-lite';
import React from 'react';
import { StateStore, useStore } from '../stores';

type PillItemProps = {
  id: string;
  children: React.ReactNode;
};

type Pill = {
  id: string;
  text: string;
};

type PillSelectorProps = {
  title: string;
  stateSelector: (store: StateStore) => string;
  handleSelect: (store: StateStore, id: string) => void;
  items: Pill[];
};

export const PillSelector = observer(
  ({ title, stateSelector, handleSelect, items }: PillSelectorProps) => {
    const store = useStore();
    const handleClick = (event: React.MouseEvent) => {
      handleSelect(store, event.currentTarget.id);
    };

    const PillItem = observer(({ id, children }: PillItemProps) => {
      let className = 'pills__item';
      if (stateSelector(store) === id) {
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
        <h3>{title}</h3>
        <ul className="pills">
          {items.map(({ id, text }) => (
            <PillItem key={id} id={id}>
              {text}
            </PillItem>
          ))}
        </ul>
      </>
    );
  },
);
