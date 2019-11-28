import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '../app/components/SearchBar';

storiesOf('SearchBar', module).add('default', () => (
  <SearchBar p={3} placeholder="Enter some text ..." />
));
