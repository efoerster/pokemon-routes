import React from 'react';
import { observer } from 'mobx-react-lite';
import { useForm } from 'react-hook-form';
import { useStore } from '../stores';
import { PickStarterArgs } from '../stores/starter';

type IVInputCellProps = {
  name: string;
};

export const StarterPicker = observer(() => {
  const { starter } = useStore();
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((args) =>
    starter.pickStarter(args as PickStarterArgs),
  );

  const IVInputCell = ({ name }: IVInputCellProps) => (
    <td>
      <input
        name={name}
        type="number"
        min="0"
        max="31"
        defaultValue={starter[name]}
        ref={register({ required: true, min: 0, max: 31 })}
        onFocus={(event) => event.target.select()}
      />
    </td>
  );

  return (
    <form onSubmit={onSubmit}>
      <table>
        <thead>
          <tr>
            <th>Nature</th>
            <th>HP</th>
            <th>ATK</th>
            <th>DEF</th>
            <th>SPA</th>
            <th>SPD</th>
            <th>SPE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select name="nature" ref={register}>
                <option value="rash">Rash</option>
                <option value="mild">Mild</option>
                <option value="modest">Modest</option>
              </select>
            </td>
            <IVInputCell name="hp" />
            <IVInputCell name="atk" />
            <IVInputCell name="def" />
            <IVInputCell name="spa" />
            <IVInputCell name="spd" />
            <IVInputCell name="spe" />
          </tr>
        </tbody>
      </table>
      <input className="button button--primary" type="submit" />
    </form>
  );
});
