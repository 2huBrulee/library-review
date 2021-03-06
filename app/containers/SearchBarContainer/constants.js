/*
 *
 * SearchBarContainer constants
 *
 */

export const AUTHORS = 'AUTHORS';
export const BOOKS = 'BOOKS';

export const TRUSTED = 'TRUSTED';
export const REGULAR = 'REGULAR';
export const GR = 'GR';

export const BASE = 'BASE';
export const AUT = 'AUT';
export const LEXILE = 'LEXILE';
export const MANU = 'MANU';

export const SEARCH_TYPES = [
  {
    label: 'Regular',
    value: REGULAR,
  },
  {
    label: 'Trusted',
    value: TRUSTED,
  },
  {
    label: GR,
    value: GR,
  },
];

export const ORIGINS = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Base',
    value: BASE,
  },
  {
    label: 'Aut',
    value: AUT,
  },
  {
    label: 'Lexile',
    value: LEXILE,
  },
  {
    label: 'Manu',
    value: MANU,
  },
];

export const SEARCH_CATEGORIES = [
  {
    label: 'Search Books',
    value: BOOKS,
  },
  {
    label: 'Search Authors',
    value: AUTHORS,
  },
];

export const SET_BOOKS_SEARCH = 'app/SearchBarContainer/SET_BOOKS_SEARCH';
export const SET_AUTHORS_SEARCH = 'app/SearchBarContainer/SET_AUTHORS_SEARCH';

export const SET_SEARCH_TYPE = 'app/SearchBarContainer/CHANGE_SEARCH_TYPE';
export const SET_SEARCH_CATEGORY =
  'app/SearchBarContainer/CHANGE_SEARCH_CATEGORY';
export const CHANGE_SEARCH_STRING =
  'app/SearchBarContainer/CHANGE_SEARCH_STRING';
export const SET_SEARCH_ORIGIN = 'app/SearchBarContainer/CHANGE_SEARCH_ORIGIN';
export const CHANGE_MORE_OPTIONS_VISIBILITY =
  'app/SearchBarContainer/CHANGE_MORE_OPTIONS_VISIBILITY';
export const CHANGE_HIDDEN_VISIBILITY =
  'app/SearchBarContainer/CHANGE_HIDDEN_VISIBILITY';
export const CHANGE_DUPLICATES_VISIBILITY =
  'app/SearchBarContainer/CHANGE_DUPLICATES_VISIBILITY';
export const CHANGE_NUMBER_OF_RESULTS =
  'app/SearchBarContainer/CHANGE_NUMBER_OF_RESULTS';
export const SET_REDUX_INIT = 'app/SearchBarContainer/SET_REDUX_INIT';
