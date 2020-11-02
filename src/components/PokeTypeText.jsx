import React from 'react';

export function PokeTypeText({ type, text }) {
  return <b style={{ color: `var(--pokemon-type-${type})` }}>{text}</b>;
}
