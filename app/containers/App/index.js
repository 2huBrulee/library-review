/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import Authors from 'containers/Authors/Loadable';
import Books from 'containers/Books/Loadable';
import SearchBarContainer from 'containers/SearchBarContainer/Loadable';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import styled, { ThemeProvider } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import GlobalStyle from '../../global-styles';
import messages from './messages';
import theme from '../../theme';

const Title = styled.div`
  font-size: 40px;
  margin: 0 0 10px;
  padding: 10px 0;
`;

const Container = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>
          <FormattedMessage {...messages.header} />
        </Title>
        <SearchBarContainer />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/authors" component={Authors} />
          <Route exact path="/books" component={Books} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
        <GlobalStyle />
      </Container>
    </ThemeProvider>
  );
}
