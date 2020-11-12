import { useQuery } from 'react-query';
import slugify from 'slugify';
import PokeAPI, { IPokemon, IItem, IMove } from 'pokeapi-typescript';

function usePokeApi(name: string | undefined, endpoint: string) {
  const { data } = useQuery(
    name,
    async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await PokeAPI[endpoint].resolve(slugify(name!, { lower: true }));
    },
    { enabled: !!name },
  );

  return data;
}

export const usePokemon = (name: string | undefined): IPokemon =>
  usePokeApi(name, 'Pokemon');

export const usePokeItem = (name: string | undefined): IItem =>
  usePokeApi(name, 'Item');

export const usePokeMove = (name: string | undefined): IMove =>
  usePokeApi(name, 'Move');

const STAT_TO_NAME = {
  hp: 'hp',
  atk: 'attack',
  def: 'defense',
  spd: 'special-defense',
  spa: 'special-attack',
  spe: 'speed',
};

export type Stat = 'hp' | 'atk' | 'def' | 'spd' | 'spa' | 'spe';

export function getBaseStat({ stats }: IPokemon, stat: Stat): number {
  const name = STAT_TO_NAME[stat];
  return stats.find((x) => x.stat.name === name)?.base_stat ?? Number.NaN;
}
