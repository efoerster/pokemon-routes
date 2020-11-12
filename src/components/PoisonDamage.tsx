import React from 'react';
import { getBaseStat, usePokemon } from '../pokeapi';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { calcHealth } from '../pokecalc';
import { AdjustEVFunction } from './MoveDamage';
import { PokeTypeText } from './PokeTypeText';

type PoisonDamageProps = {
  name: string;
  level: number;
  ev: number;
  displayLevel?: boolean;
  adjustEV?: AdjustEVFunction;
};

export const PoisonDamage = observer(
  ({ name, level, ev, displayLevel, adjustEV }: PoisonDamageProps) => {
    const store = useStore();
    const pokemon = usePokemon(name);

    let damage = Number.NaN;
    if (pokemon) {
      if (adjustEV) {
        ev = adjustEV(store, 'hp', ev);
      }

      const baseStat = getBaseStat(pokemon, 'hp');
      const iv = store.starter.hp;
      const health = calcHealth(baseStat, level, iv, ev);
      damage = Math.trunc(health / 8);
    }

    return (
      <>
        <PokeTypeText text="Poison" type="poison" /> damage{' '}
        {displayLevel && <> at level {level}</>}: <b>{damage}</b>
      </>
    );
  },
);
