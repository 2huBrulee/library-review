import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchBar from '../app/components/SearchBar';

storiesOf('SearchBar', module).add('default', () => (
  <SearchBar placeholder="Enter some text ..." />
));
