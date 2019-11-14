/*
 * Books Messages
 *
 * This contains all the text for the Books container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Books';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Books container!',
  },
});
