import React from 'react';
import { IMove, IPokemon, IPokemonStat } from 'pokeapi-typescript';
import { usePokeMove, usePokemon } from '../pokeapi';
import { PokeMove } from './PokeMove';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { StarterStore } from '../stores/starter';
import {
  calcDmgRange,
  calcStat,
  isSpecialType,
  NatureEffect,
  Type,
} from '../pokecalc';

type DefenderPokemon = {
  name: string;
  level: number;
  ev: number;
  stage: number;
  defBadge?: boolean;
};

type AttackerPokemon = {
  name: string;
  level: number;
  atk: number;
  torrent?: boolean;
};

type PokeDamageProps = {
  name: string;
  defender: DefenderPokemon;
  attacker: AttackerPokemon;
  displayLevel?: boolean;
};

export const PokeDamage = observer(
  ({ name, defender, attacker, displayLevel }: PokeDamageProps) => {
    const { starter } = useStore();
    const move = usePokeMove(name);
    const defPokemon = usePokemon(defender.name);
    const atkPokemon = usePokemon(attacker.name);

    let dmgRange = '';
    if (move && defPokemon && atkPokemon) {
      const moveType = move.type.name as Type;
      const { atk, torrent } = attacker;
      const { ev, defBadge, stage: defStage } = defender;

      const def = calcDefStat(
        starter,
        defender.level,
        ev,
        moveType,
        defPokemon.stats,
      );

      const range = calcDmgRange(
        {
          level: attacker.level,
          atk,
          types: getPokemonType(atkPokemon),
          move: { power: getMovePower(move), type: moveType },
        },
        { def, types: getPokemonType(defPokemon) },
        { defBadge, defStage, torrent },
      );

      dmgRange = formatDmgRange(range);
    }

    return (
      <>
        <PokeMove name={name} /> damage
        {displayLevel && <> at level {defender.level}</>}
        {defender.stage && (
          <>
            {' '}
            at {defender.stage > 0 && '+'}
            {defender.stage} Def
          </>
        )}
        {attacker.torrent && <> at ⅓ health</>}: <b>{dmgRange}</b>
      </>
    );
  },
);

function calcDefStat(
  starter: StarterStore,
  level: number,
  ev: number,
  moveType: Type,
  stats: IPokemonStat[],
): number {
  const defIV = isSpecialType(moveType) ? starter.spd : starter.def;
  const defStatName = isSpecialType(moveType) ? 'special-defense' : 'defense';
  const baseDef =
    stats.find((x) => x.stat.name === defStatName)?.base_stat ?? Number.NaN;

  const nature: NatureEffect =
    (defStatName === 'defense' && starter.nature === 'mild') ||
    (defStatName === 'special-defense' && starter.nature === 'rash')
      ? 'negative'
      : 'neutral';

  return calcStat(baseDef, level, defIV, ev, nature);
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
