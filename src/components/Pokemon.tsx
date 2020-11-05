import React from 'react';
import { PokeTypeText } from './PokeTypeText';
import { usePokemon } from '../pokeapi';

type PokemonProps = {
  name: string;
};

export function Pokemon({ name }: PokemonProps): JSX.Element {
  const pokemon = usePokemon(name);
  const type = pokemon && pokemon.types[0].type.name;
  const sprite =
    pokemon &&
    (pokemon.sprites as any).versions['generation-iii']['firered-leafgreen']
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
