import React from 'react';
import { useQuery } from 'react-query';
import slugify from 'slugify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Pokedex from '../pokeapi';
import { PokeTypeText } from './PokeTypeText';
import { useGlobalState } from '../state';

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

export function PokeMove({ name, dmgRanges, torrent }) {
  const [starter] = useGlobalState('starter');
  const { data: move } = useQuery(name, async () => {
    return await Pokedex.getMoveByName(slugify(name, { lower: true }));
  });

  const type = move && move.type.name;
  const style = torrent ? { borderBottom: '3px dashed #6890F0' } : null;

  let damage = null;
  if (dmgRanges && move) {
    const defStat = SPECIAL_TYPES.includes(type) ? 'spd' : 'def';
    const ranges =
      (defStat === 'def' && starter.nature === 'Mild') ||
      (defStat === 'spd' && starter.nature === 'Rash')
        ? dmgRanges.lowered
        : dmgRanges.normal;

    const defIV = starter[defStat];
    const range = ranges.find((x) => defIV >= x.from && defIV <= x.to);
    damage = range.value;
  }

  return (
    <>
      {move && move.priority >= 1 && (
        <>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={{ color: 'var(--ifm-color-danger)' }}
          />{' '}
        </>
      )}
      <span style={style}>
        <PokeTypeText type={type} text={name} />
      </span>
      {damage && (
        <>
          {' '}
          damage: <b>{damage}</b>
        </>
      )}
    </>
  );
}
