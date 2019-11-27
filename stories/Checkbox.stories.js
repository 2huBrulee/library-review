import React from 'react';
import { storiesOf } from '@storybook/react';

import Checkbox from '../app/components/Checkbox';

storiesOf('Checkbox', module).add('default', () => (
  <Checkbox label="Enable Option" />
));
