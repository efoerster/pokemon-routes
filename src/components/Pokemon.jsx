import React from 'react';
import { PokeTypeText } from './PokeTypeText';
import { usePokemon } from '../pokeapi';

export function Pokemon({ name }) {
  const pokemon = usePokemon(name);
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
