import { Animals } from './categories/animals';
import { Countries } from './categories/countries';
import { Entertainment } from './categories/entertainment';
import { Music } from './categories/music';
import { Misc } from './categories/misc';
import { Brands } from './categories/brands';
import { Celebrities } from './categories/celebrities';
import { Colors } from './categories/colors';
import { Fruits } from './categories/fruits';
import { Furniture } from './categories/furniture';
import { MusicalInstruments } from './categories/musical-instruments';

export const DIFFICULTY = {
  E: 12,
  M: 10,
  H: 8
} as const;

export type Difficulty = keyof typeof DIFFICULTY;
export type Category = keyof typeof CATEGORIES;

export const CATEGORIES = {
  ...Music,
  ...Entertainment,
  ...Brands,
  Animals,
  Countries,
  Colors,
  Fruits,
  Furniture,
  'Musical Instruments': MusicalInstruments,
  ...Misc,
  Celebrities
} as const;