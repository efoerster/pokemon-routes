export type NatureEffect = 'neutral' | 'positive' | 'negative';
export type Type =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel';

export type Attacker = {
  level: number;
  atk: number;
  types: Type[];
  move: {
    power: number;
    type: Type;
  };
};

export type Defender = {
  types: Type[];
  def: number;
};

export type BonusEffects = Partial<{
  defBadge: boolean;
  defStage: number;
  torrent: boolean;
}>;

export function calcStat(
  baseStat: number,
  level: number,
  iv: number,
  ev: number,
  natureEffect: NatureEffect = 'neutral',
): number {
  let nature = 1.0;
  if (natureEffect === 'positive') {
    nature = 1.1;
  } else if (natureEffect === 'negative') {
    nature = 0.9;
  }

  let stat = 2 * baseStat + iv + Math.trunc(ev / 4);
  stat = Math.trunc((Math.trunc((stat * level) / 100) + 5) * nature);
  return stat;
}

export function calcHealth(
  baseHealth: number,
  level: number,
  iv: number,
  ev: number,
): number {
  let stat = 2 * baseHealth + iv + Math.trunc(ev / 4);
  stat = Math.trunc((stat * level) / 100) + level + 10;
  return stat;
}

export function calcDmgRange(
  { level, atk, types: atkTypes, move }: Attacker,
  { def, types: defTypes }: Defender,
  { defBadge, defStage, torrent }: BonusEffects,
): number[] {
  if (defStage) {
    const factor = defStage > 0 ? (2 + defStage) / 2 : 2 / (2 - defStage);
    def = Math.trunc(def * factor);
  }

  if (defBadge) {
    def = Math.trunc(def * 1.1);
  }

  if (torrent) {
    move.power = Math.trunc(move.power * 1.5);
  }

  let baseDmg = (Math.trunc((2 * level) / 5) + 2) * move.power;
  baseDmg = Math.trunc(Math.trunc(baseDmg * (atk / def)) / 50) + 2;

  if (atkTypes.find((type) => type === move.type)) {
    baseDmg = Math.trunc(baseDmg * 1.5);
  }

  for (const type of defTypes) {
    baseDmg = Math.trunc(baseDmg * TYPES_FACTORS[move.type][TYPE_INDEX[type]]);
  }

  const range: number[] = [];
  for (let rnd = 0.85; rnd <= 1.0; rnd += 0.01) {
    range.push(Math.trunc(baseDmg * rnd));
  }

  return range;
}

export function isSpecialType(type: Type): boolean {
  return SPECIAL_TYPES.includes(type);
}

const SPECIAL_TYPES = [
  'water',
  'grass',
  'fire',
  'ice',
  'electric',
  'psychic',
  'dragon',
  'dark',
];

const TYPE_INDEX = {
  normal: 0,
  fire: 1,
  water: 2,
  electric: 3,
  grass: 4,
  ice: 5,
  fighting: 6,
  poison: 7,
  ground: 8,
  flying: 9,
  psychic: 10,
  bug: 11,
  rock: 12,
  ghost: 13,
  dragon: 14,
  dark: 15,
  steel: 16,
};

const TYPES_FACTORS = {
  normal: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5],
  fire: [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2],
  water: [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1],
  electric: [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1],
  grass: [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5],
  ice: [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 0.5],
  fighting: [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2],
  poison: [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 0],
  ground: [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 2],
  flying: [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 0.5],
  psychic: [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 0.5],
  bug: [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 0.5],
  rock: [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 0.5],
  ghost: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  dragon: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0.5],
  dark: [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5],
  steel: [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0.5],
};
