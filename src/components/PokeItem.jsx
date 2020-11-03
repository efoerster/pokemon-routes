import React from 'react';
import { usePokeItem } from '../pokeapi';

export function PokeItem({ name, text }) {
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
