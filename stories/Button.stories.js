import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import Button from '../app/components/Button';

storiesOf('Button', module).add('default', () => (
  <Button onClick={action('onClick')}>Prueba</Button>
));
