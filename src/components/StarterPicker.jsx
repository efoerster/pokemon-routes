import React from 'react';
import { useForm } from 'react-hook-form';
import { useGlobalState } from '../state';

export function StarterPicker() {
  const [starter, setStarter] = useGlobalState('starter');
  const { register, handleSubmit } = useForm();

  const IVInputCell = ({ name }) => (
    <td>
      <input
        name={name}
        type="number"
        min="0"
        max="31"
        defaultValue={starter[name]}
        ref={register({ required: true, min: 0, max: 31 })}
      />
    </td>
  );

  return (
    <form onSubmit={handleSubmit(setStarter)}>
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
                <option value="Rash">Rash</option>
                <option value="Mild">Mild</option>
                <option value="Modest">Modest</option>
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
}
