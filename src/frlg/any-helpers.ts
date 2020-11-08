import { AdjustEVFunction } from '../components/PokeDamage';
import { MtMoonExp } from '../stores/frlg';
import { StarterStore } from '../stores/starter';

type AntidoteInfo = {
  hp: number;
  torrent: boolean;
  heal: boolean;
};

export function antidoteInfo({ nature, def, hp }: StarterStore): AntidoteInfo {
  if ((nature === 'mild' && def >= 7) || (nature !== 'mild' && def <= 6)) {
    if (hp <= 2) {
      return { hp: 7, torrent: false, heal: false };
    } else if (hp <= 11 || hp == 22 || hp == 23) {
      return { hp: 6, torrent: false, heal: false };
    } else if (hp == 24 || hp == 31) {
      return { hp: 5, torrent: true, heal: false };
    }
    return { hp: 6, torrent: true, heal: false };
  } else if (nature !== 'mild' && def >= 7) {
    let antidoteAt = 0;
    if (hp <= 1) {
      antidoteAt = 6;
    } else if (hp == 24) {
      antidoteAt = 4;
    } else {
      antidoteAt = 5;
    }
    return { hp: antidoteAt, torrent: true, heal: false };
  } else if (nature === 'mild' && def <= 3) {
    if (hp == 0) {
      return { hp: 8, torrent: false, heal: true };
    } else if (hp == 24) {
      return { hp: 6, torrent: false, heal: false };
    }
    return { hp: 7, torrent: false, heal: true };
  }

  if (hp == 0) {
    return { hp: 7, torrent: false, heal: true };
  } else if (hp <= 21) {
    return { hp: 6, torrent: false, heal: true };
  } else if (hp <= 30) {
    return { hp: 6, torrent: true, heal: true };
  }

  return { hp: 6, torrent: true, heal: false };
}

export function grabPersimBerry(
  { nature, def, spd, spa }: StarterStore,
  mtMoonExp: MtMoonExp,
): boolean {
  if (nature === 'mild') {
    return false;
  }

  if (spa == 28 || spa == 29) {
    return true;
  }

  if (nature === 'rash') {
    if (
      mtMoonExp === 'josh' &&
      ((def >= 13 && def <= 27 && spd >= 15) || (def <= 12 && spd >= 5))
    ) {
      return false;
    }

    return spd <= 4 || (spd <= 14 && def >= 12) || def >= 27;
  }

  return mtMoonExp !== 'josh' && def >= 27;
}

export function grabCarbosFor(
  { spe }: StarterStore,
  mtMoonExp: MtMoonExp,
): string | null {
  if (spe == 20) {
    return 'giovanni';
  }

  if (spe == 22 || (spe == 23 && mtMoonExp !== 'josh')) {
    return 'blaine';
  }

  if ((spe == 29 && mtMoonExp === 'josh') || spe >= 30) {
    return 'sabrina';
  }

  return null;
}

export function silphRivalHP({ nature, def }: StarterStore): number {
  if (nature === 'mild') {
    return def <= 11 ? 82 : 80;
  }

  if (def <= 4) {
    return 80;
  } else if (def <= 25) {
    return 76;
  }

  return 74;
}

export const adjustEV: AdjustEVFunction = (store, stat, ev) => {
  if (stat === 'def') {
    switch (store.frlg.mtMoonExp) {
      case 'josh':
        return ev - 2;
      case 'spinner':
        return ev - 1;
      case 'marcos':
        return ev + 1;
      default:
        return ev;
    }
  }

  return ev;
};
