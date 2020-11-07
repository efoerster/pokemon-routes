import { makeAutoObservable } from 'mobx';

export type MtMoonExp = 'robby' | 'josh' | 'spinner' | 'marcos';

export class FRLGStore {
  mtMoonExp: MtMoonExp = 'robby';

  constructor() {
    makeAutoObservable(this);
  }

  pickMtMoonExp(mtMoonExp: MtMoonExp): void {
    this.mtMoonExp = mtMoonExp;
  }
}
