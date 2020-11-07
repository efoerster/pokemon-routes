import React from 'react';
import { IMove, IPokemon } from 'pokeapi-typescript';
import { usePokeMove, usePokemon } from '../pokeapi';
import { PokeMove } from './PokeMove';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';
import { StarterStore } from '../stores/starter';

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
      const def = calcDefStat(move.type.name, starter, defPokemon, defender);
      const baseDmg = calcBaseDmg(attacker, move, atkPokemon, defPokemon, def);
      dmgRange = calcDmgRange(baseDmg);
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

const TYPE_INDEX = {
  normal: 0,
  fire: 1,
  water: 2,
  electric: 3,
  grass: 4,
  ice: 5,
  fighting: 6,
  poison: 7,
  ground: 8,
  flying: 9,
  psychic: 10,
  bug: 11,
  rock: 12,
  ghost: 13,
  dragon: 14,
  dark: 15,
  steel: 16,
};

const TYPES_FACTORS = {
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5],
  fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2],
  water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1],
  electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1],
  grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5],
  ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5],
  fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2],
  poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0],
  ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2],
  flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5],
  psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5],
  bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5],
  rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5],
  ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
  dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5],
};

const SPECIAL_TYPES = [
  'water',
  'grass',
  'fire',
  'ice',
  'electric',
  'psychic',
  'dragon',
  'dark',
];

function calcDefStat(
  type: string,
  starter: StarterStore,
  defPokemon: IPokemon,
  { level, ev, stage, defBadge }: DefenderPokemon,
): number {
  const defIV = SPECIAL_TYPES.includes(type) ? starter.spd : starter.def;
  const defStatName = SPECIAL_TYPES.includes(type)
    ? 'special-defense'
    : 'defense';

  const baseDef =
    defPokemon.stats.find((x) => x.stat.name === defStatName)?.base_stat ??
    Number.NaN;

  const nature =
    (defStatName === 'defense' && starter.nature === 'mild') ||
    (defStatName === 'special-defense' && starter.nature === 'rash')
      ? 0.9
      : 1.0;

  let def = 2 * baseDef + defIV + Math.trunc(ev / 4);
  def = Math.trunc((Math.trunc((def * level) / 100) + 5) * nature);

  if (stage) {
    const factor = stage > 0 ? (2 + stage) / 2 : 2 / (2 - stage);
    def = Math.trunc(def * factor);
  }

  if (defBadge) {
    def = Math.trunc(def * 1.1);
  }

  return def;
}

function calcBaseDmg(
  { level, atk, torrent }: AttackerPokemon,
  move: IMove,
  atkPokemon: IPokemon,
  defPokemon: IPokemon,
  def: number,
): number {
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
  if (torrent) {
    power = Math.trunc(power * 1.5);
  }

  let dmg = (Math.trunc((2 * level) / 5) + 2) * power;
  dmg = Math.trunc(Math.trunc(dmg * (atk / def)) / 50) + 2;

  if (atkPokemon.types.find((x) => x.type.name === move.type.name)) {
    dmg = Math.trunc(dmg * 1.5);
  }

  for (const { type } of defPokemon.types) {
    dmg = Math.trunc(
      dmg * TYPES_FACTORS[move.type.name][TYPE_INDEX[type.name]],
    );
  }

  return dmg;
}

function calcDmgRange(maxDmg: number): string {
  const minDmg = Math.trunc(maxDmg * 0.85);
  const secondDmgValue = Math.trunc(maxDmg * 0.86);
  const penultDmgValue = Math.trunc(maxDmg * 0.99);

  let dmgRange: string;

  if (minDmg == secondDmgValue && maxDmg == penultDmgValue) {
    dmgRange = formatRange(minDmg, maxDmg);
  } else if (minDmg != secondDmgValue && maxDmg == penultDmgValue) {
    dmgRange = `(${minDmg})${formatRange(secondDmgValue, maxDmg)}`;
  } else if (minDmg == secondDmgValue && maxDmg != penultDmgValue) {
    dmgRange = `${formatRange(minDmg, penultDmgValue)}(${maxDmg})`;
  } else {
    dmgRange = `(${minDmg})${formatRange(
      secondDmgValue,
      penultDmgValue,
    )}(${maxDmg})`;
  }
  return dmgRange;
}

function formatRange(left: number, right: number): string {
  return left == right ? `${left}` : `${left}-${right}`;
}
