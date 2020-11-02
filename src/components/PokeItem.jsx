import React from 'react';
import { useQuery } from 'react-query';
import slugify from 'slugify';
import Pokedex from '../pokeapi';

export function PokeItem({ name, text }) {
  const { data: item } = useQuery(name, async () => {
    return await Pokedex.getItemByName(slugify(name, { lower: true }));
  });

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
