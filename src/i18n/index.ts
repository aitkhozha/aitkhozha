import type { Locale } from './locales';
import ru, { type Dictionary } from './dictionaries/ru';
import kk from './dictionaries/kk';
import en from './dictionaries/en';
import ko from './dictionaries/ko';
import zh from './dictionaries/zh';
import ms from './dictionaries/ms';
import ar from './dictionaries/ar';

const dictionaries: Record<Locale, Dictionary> = { ru, kk, en, ko, zh, ms, ar };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
export type { Dictionary };
