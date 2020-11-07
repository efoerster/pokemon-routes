import { makeAutoObservable } from 'mobx';

export type Nature = 'rash' | 'mild' | 'modest';

export type PickStarterArgs = {
  [K in keyof StarterStore]: string;
};

export class StarterStore {
  nature: Nature = 'rash';
  hp = 31;
  atk = 31;
  def = 31;
  spa = 31;
  spd = 31;
  spe = 31;

  constructor() {
    makeAutoObservable(this);
  }

  pickStarter({ nature, hp, atk, def, spa, spd, spe }: PickStarterArgs): void {
    this.nature = nature as Nature;
    this.hp = parseInt(hp);
    this.atk = parseInt(atk);
    this.def = parseInt(def);
    this.spa = parseInt(spa);
    this.spd = parseInt(spd);
    this.spe = parseInt(spe);
  }
}
