import React from 'react';
import { useGlobalState } from '../state';

type SpeedInfoProps = {
  range: {
    from: number;
    to: number;
    at: number;
  };
};

export function SpeedInfo({ range }: SpeedInfoProps): JSX.Element {
  const [starter] = useGlobalState('starter');
  return (
    <>
      {range && starter.spe >= range.from && starter.spe <= range.to && (
        <b style={{ float: 'right', color: 'var(--ifm-color-warning)' }}>
          {starter.spe} Speed Ties {range.at !== 0 && `at ${range.at}`}
        </b>
      )}
    </>
  );
}
