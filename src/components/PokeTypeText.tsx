import React from 'react';

type PokeTypeTextProps = {
  type: string;
  text: string;
};

export function PokeTypeText({ type, text }: PokeTypeTextProps) {
  return <b style={{ color: `var(--pokemon-type-${type})` }}>{text}</b>;
}
