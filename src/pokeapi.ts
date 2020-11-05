import { useQuery } from 'react-query';
import slugify from 'slugify';
import PokeAPI, { IPokemon, IItem, IMove } from 'pokeapi-typescript';

function usePokeApi(name: string, endpoint: string) {
  const { data } = useQuery(
    name,
    async () => {
      return await PokeAPI[endpoint].resolve(slugify(name, { lower: true }));
    },
    { enabled: !!name },
  );

  return data;
}

export const usePokemon = (name: string): IPokemon =>
  usePokeApi(name, 'Pokemon');
export const usePokeItem = (name: string): IItem => usePokeApi(name, 'Item');
export const usePokeMove = (name: string): IMove => usePokeApi(name, 'Move');
