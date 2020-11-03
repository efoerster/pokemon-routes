import { useQuery } from 'react-query';
import slugify from 'slugify';

const Pokedex = new (require('pokeapi-js-wrapper').Pokedex)();

function usePokeApi(name, endpoint) {
  const { data } = useQuery(name, async () => {
    return await Pokedex[endpoint](slugify(name, { lower: true }));
  });

  return data;
}

export const usePokemon = (name) => usePokeApi(name, 'getPokemonByName');
export const usePokeItem = (name) => usePokeApi(name, 'getItemByName');
export const usePokeMove = (name) => usePokeApi(name, 'getMoveByName');
