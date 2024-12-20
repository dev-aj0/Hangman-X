import { Rappers } from './rappers';
import { Singers } from './singers';
import { Producers } from './producers';
import { ClassicalMusic } from './classical';
import { PopMusic } from './pop';
import { RockMusic } from './rock';
import { HipHop } from './hiphop';

export const Music = {
  Rappers,
  Singers,
  Producers,
  'Classical Music': ClassicalMusic,
  'Pop Music': PopMusic,
  'Rock Music': RockMusic,
  'Hip Hop': HipHop
} as const;