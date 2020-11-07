import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../stores';

type SpeedInfoProps = {
  range: {
    from: number;
    to: number;
    at: number;
  };
};

export const SpeedInfo = observer(({ range }: SpeedInfoProps) => {
  const { starter } = useStore();
  return (
    <>
      {range && starter.spe >= range.from && starter.spe <= range.to && (
        <b style={{ float: 'right', color: 'var(--ifm-color-warning)' }}>
          {starter.spe} Speed Ties {range.at !== 0 && `at ${range.at}`}
        </b>
      )}
    </>
  );
});
