/*
 * NoSearchResults Messages
 *
 * This contains all the text for the NoSearchResults component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NoSearchResults';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'No results found!',
  },
});
