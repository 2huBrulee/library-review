import React from 'react';
import { storiesOf } from '@storybook/react';

import TextInput from '../app/components/TextInput';

storiesOf('TextInput', module).add('default', () => (
  <TextInput placeholder="Enter some text ..." />
));
