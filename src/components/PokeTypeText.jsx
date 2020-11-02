import React from 'react';

const TYPE_COLORS = {
  bug: '#A8B820',
  dark: '#705848',
  dragon: '#7038F8',
  electric: '#F8D030',
  fairy: '#EE99AC',
  fighting: '#C03028',
  fire: '#F08030',
  flying: '#A890F0',
  ghost: '#705898',
  grass: '#78C850',
  ground: '#E0C068',
  ice: '#98D8D8',
  normal: '#A8A878',
  poison: '#A040A0',
  psychic: '#F85888',
  rock: '#B8A038',
  steel: '#B8B8D0',
  water: '#6890F0',
};

export function PokeTypeText({ type, text }) {
  const color =
    type in TYPE_COLORS ? TYPE_COLORS[type] : 'var(--ifm-font-color-base)';
  return <b style={{ color }}>{text}</b>;
}
