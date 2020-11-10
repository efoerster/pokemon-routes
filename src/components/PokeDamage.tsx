import React from 'react';
import { IMove, IPokemon, IPokemonStat } from 'pokeapi-typescript';
import { usePokeMove, usePokemon } from '../pokeapi';
import { PokeMove } from './PokeMove';
import { observer } from 'mobx-react-lite';
import { StateStore, useStore } from '../stores';
import {
  calcDmgRange,
  calcStat,
  isSpecialType,
  NatureEffect,
  Type,
} from '../pokecalc';

type Player = {
  name: string;
  level: number;
  ev: number;
  stage: number;
  defBadge?: boolean;
};

type Enemy = {
  name: string;
  level: number;
  atk: number;
  torrent?: boolean;
};

export type AdjustEVFunction = (
  store: StateStore,
  stat: string,
  ev: number,
) => number;

type PokeDamageProps = {
  name: string;
  player: Player;
  enemy: Enemy;
  displayLevel?: boolean;
  adjustEV?: AdjustEVFunction;
};

export const PokeDamage = observer(
  ({ name, player, enemy, displayLevel, adjustEV }: PokeDamageProps) => {
    const store = useStore();
    const move = usePokeMove(name);
    const playerPokemon = usePokemon(player.name);
    const enemyPokemon = usePokemon(enemy.name);

    let dmgRange = '';
    if (move && playerPokemon && enemyPokemon) {
      const moveType = move.type.name as Type;
      const { atk, torrent } = enemy;
      const { ev, defBadge, stage: defStage } = player;
      const def = calcDefStat(
        store,
        player.level,
        ev,
        moveType,
        playerPokemon.stats,
        adjustEV,
      );

      const range = calcDmgRange(
        {
          level: enemy.level,
          atk,
          types: getPokemonType(enemyPokemon),
          move: { power: getMovePower(move), type: moveType },
        },
        { def, types: getPokemonType(playerPokemon) },
        { defBadge, defStage, torrent },
      );

      dmgRange = formatDmgRange(range);
    }

    return (
      <>
        <PokeMove name={name} /> damage
        {displayLevel && <> at level {player.level}</>}
        {player.stage && (
          <>
            {' '}
            at {player.stage > 0 && '+'}
            {player.stage} Def
          </>
        )}
        {enemy.torrent && <> at ⅓ health</>}: <b>{dmgRange}</b>
      </>
    );
  },
);

function calcDefStat(
  store: StateStore,
  level: number,
  ev: number,
  moveType: Type,
  stats: IPokemonStat[],
  adjustEV?: AdjustEVFunction,
): number {
  const { starter } = store;
  const { stat, name } = isSpecialType(moveType)
    ? { stat: 'spd', name: 'special-defense' }
    : { stat: 'def', name: 'defense' };

  const baseDef =
    stats.find((x) => x.stat.name === name)?.base_stat ?? Number.NaN;

  const nature: NatureEffect =
    (name === 'defense' && starter.nature === 'mild') ||
    (name === 'special-defense' && starter.nature === 'rash')
      ? 'negative'
      : 'neutral';

  if (adjustEV) {
    ev = adjustEV(store, stat, ev);
  }

  return calcStat(baseDef, level, starter[stat], ev, nature);
}

function getMovePower(move: IMove) {
  let power = move.power;
  if (move.past_values.length > 0) {
    for (const { power: pastPower, version_group } of move.past_values) {
      const versionName = version_group.name;
      if (
        pastPower &&
        versionName != 'red-blue' &&
        versionName != 'gold-silver'
      ) {
        power = pastPower;
        break;
      }
    }
  }

  return power;
}

function getPokemonType(pokemon: IPokemon): Type[] {
  return pokemon.types.map((x) => x.type.name as Type);
}

function formatDmgRange(range: number[]): string {
  const minDmg = range[0];
  const secondDmgValue = range[1];
  const penultDmgValue = range[range.length - 2];
  const maxDmg = range[range.length - 1];

  let formatted: string;

  if (minDmg == secondDmgValue && maxDmg == penultDmgValue) {
    formatted = formatInterval(minDmg, maxDmg);
  } else if (minDmg != secondDmgValue && maxDmg == penultDmgValue) {
    formatted = `(${minDmg})${formatInterval(secondDmgValue, maxDmg)}`;
  } else if (minDmg == secondDmgValue && maxDmg != penultDmgValue) {
    formatted = `${formatInterval(minDmg, penultDmgValue)}(${maxDmg})`;
  } else {
    formatted = `(${minDmg})${formatInterval(
      secondDmgValue,
      penultDmgValue,
    )}(${maxDmg})`;
  }
  return formatted;
}

function formatInterval(left: number, right: number): string {
  return left == right ? `${left}` : `${left}-${right}`;
}
