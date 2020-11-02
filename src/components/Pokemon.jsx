import React from 'react';
import { useQuery } from 'react-query';
import slugify from 'slugify';
import { PokeTypeText } from './PokeTypeText';
import Pokedex from '../pokeapi';

export function Pokemon({ name }) {
  const { data: pokemon } = useQuery(name, async () => {
    return await Pokedex.getPokemonByName(slugify(name, { lower: true }));
  });

  const type = pokemon && pokemon.types[0].type.name;
  const sprite =
    pokemon &&
    pokemon.sprites.versions['generation-iii']['firered-leafgreen']
      .front_default;

  return (
    <>
      <img
        width="32"
        height="32"
        src={sprite}
        style={{ verticalAlign: 'middle' }}
      />
      <PokeTypeText type={type} text={`${name}`} />
    </>
  );
}
