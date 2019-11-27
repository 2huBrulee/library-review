import { configure, addDecorator } from '@storybook/react';
import React from 'react';
import GlobalStyle from '../app/global-styles';
import theme from '../app/theme';
import { withThemesProvider } from 'themeprovider-storybook';

// automatically import all files ending in *.stories.js
addDecorator(s => (
  <>
    <GlobalStyle />
    {s()}
  </>
));
addDecorator(withThemesProvider([theme]));
configure(require.context('../stories', true, /\.stories\.js$/), module);
