import React from 'react';
import { storiesOf } from '@storybook/react';

import Select from '../app/components/Select';

const options = [
  {
    value: 1,
    label: 'First Optionnnnnnnnnnnnnnnnn',
  },
  {
    value: 2,
    label: 'Second Option',
  },
];

storiesOf('Select', module).add('default', () => (
  <Select options={options} placeholder="Select an Option" />
));
