import React from 'react';
import { getBaseStat, Stat, usePokemon } from '../pokeapi';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { calcHealth, calcStat } from '../pokecalc';
import { AdjustEVFunction } from './PokeDamage';

type LevelUpStatGainProps = {
  name: string;
  level: number;
  stat: Stat;
  ev: {
    before: number;
    after: number;
  };
  adjustEV?: AdjustEVFunction;
  evolvesInto?: string;
};

export const LevelUpStatGain = observer(
  ({ name, level, stat, ev, adjustEV, evolvesInto }: LevelUpStatGainProps) => {
    const store = useStore();
    const pokemon = usePokemon(name);
    const evolved = usePokemon(evolvesInto);

    let statGain = Number.NaN;
    let evolutionGain = Number.NaN;
    if (pokemon) {
      const baseStat = getBaseStat(pokemon, stat);
      if (adjustEV) {
        ev.before = adjustEV(store, stat, ev.before);
        ev.after = adjustEV(store, stat, ev.after);
      }

      const iv = store.starter[stat];
      const calc = stat === 'hp' ? calcHealth : calcStat;

      statGain =
        calc(baseStat, level + 1, iv, ev.after) -
        calc(baseStat, level, iv, ev.before);

      if (evolved) {
        const evolvedStat = getBaseStat(evolved, stat);
        evolutionGain =
          calc(evolvedStat, level + 1, iv, ev.after) -
          calc(baseStat, level, iv, ev.before) -
          statGain;
      }
    }

    return (
      <>
        {renderStatGain(stat, statGain)} upon level up
        {evolved && (
          <> and {renderStatGain(stat, evolutionGain)} upon evolution</>
        )}
      </>
    );
  },
);

function renderStatGain(stat: Stat, statGain: number): JSX.Element {
  return (
    <b>
      +{statGain} {stat.toLocaleUpperCase()}{' '}
    </b>
  );
}
