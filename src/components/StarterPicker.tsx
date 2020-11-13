import React from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { useStore } from '../stores';
import { PickStarterArgs } from '../stores/starter';
import { Stat } from '../pokeapi';

export const StarterPicker = observer(() => {
  const { starter } = useStore();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((args) =>
    starter.pickStarter(args as PickStarterArgs),
  );

  const inputStyle = { width: 85 };
  const IVInput = ({ stat }: IVInputProps) => (
    <input
      style={inputStyle}
      name={stat}
      type="number"
      min="0"
      max="31"
      defaultValue={starter[stat]}
      ref={register({ required: true, min: 0, max: 31 })}
      onFocus={(event) => event.target.select()}
    />
  );

  return (
    <form className="container" onSubmit={onSubmit}>
      <BadgeRow title="Nature">
        <select style={inputStyle} name="nature" ref={register}>
          <option value="rash">Rash</option>
          <option value="mild">Mild</option>
          <option value="modest">Modest</option>
        </select>
      </BadgeRow>
      <BadgeRow title="HP">
        <IVInput stat="hp" />
      </BadgeRow>
      <BadgeRow title="Attack">
        <IVInput stat="atk" />
      </BadgeRow>
      <BadgeRow title="Defense">
        <IVInput stat="def" />
      </BadgeRow>
      <BadgeRow title="Sp. Atk">
        <IVInput stat="spa" />
      </BadgeRow>
      <BadgeRow title="Sp. Def">
        <IVInput stat="spd" />
      </BadgeRow>
      <BadgeRow title="Speed">
        <IVInput stat="spe" />
      </BadgeRow>
      <br />
      <div className="row">
        <div className="col">
          <input className="button button--primary" type="submit" />
        </div>
      </div>
    </form>
  );
});

type IVInputProps = {
  stat: Stat;
};

type BadgeRowProps = {
  title: string;
  children: React.ReactNode;
};

function BadgeRow({ title, children }: BadgeRowProps): JSX.Element {
  return (
    <div className="row">
      <div className="col col--2">
        <span className="badge badge--primary">{title}</span>
      </div>
      <div className="col col--1">{children}</div>
    </div>
  );
}
