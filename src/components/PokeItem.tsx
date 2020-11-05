import React from 'react';
import { usePokeItem } from '../pokeapi';

type PokeItemProps = { name: string; text?: string };

export function PokeItem({ name, text }: PokeItemProps) {
  const item = usePokeItem(name);
  return (
    <>
      <img
        src={item && item.sprites.default}
        style={{ verticalAlign: 'middle' }}
      />
      <b>{text ? text : name}</b>
    </>
  );
}
