/**
 *
 * Asynchronously loads the component for BookContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
