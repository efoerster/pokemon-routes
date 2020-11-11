import { makeAutoObservable } from 'mobx';

export type MtMoonExp = 'robby' | 'josh' | 'spinner' | 'marcos';
export type HikerExp = 'eric' | 'nob';

export class FRLGStore {
  mtMoonExp: MtMoonExp = 'robby';
  hikerExp: HikerExp = 'eric';

  constructor() {
    makeAutoObservable(this);
  }

  pickMtMoonExp(mtMoonExp: MtMoonExp): void {
    this.mtMoonExp = mtMoonExp;
  }

  pickHikerExp(hikerExp: HikerExp): void {
    this.hikerExp = hikerExp;
  }
}
