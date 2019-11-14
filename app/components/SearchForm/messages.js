/*
 * SearchForm Messages
 *
 * This contains all the text for the SearchForm component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SearchForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SearchForm component!',
  },
  searchLabel: {
    id: `${scope}.searchLabel`,
    defaultMessage: 'Search for Books or Authors',
  },
});
