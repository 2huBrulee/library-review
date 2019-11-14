/**
 *
 * Asynchronously loads the component for Authors
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
