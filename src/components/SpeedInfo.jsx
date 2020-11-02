import React from 'react';
import { useGlobalState } from '../state';

export function SpeedInfo({ range }) {
  const [starter] = useGlobalState('starter');
  return (
    range &&
    starter.spe >= range.from &&
    starter.spe <= range.to && (
      <b style={{ float: 'right', color: 'var(--ifm-color-warning)' }}>
        {starter.spe} Speed Ties {range.at !== 0 && `at ${range.at}`}
      </b>
    )
  );
}
