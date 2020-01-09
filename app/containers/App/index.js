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
import SearchBarContainer from 'containers/SearchBarContainer';
// import NotFoundPage from 'containers/NotFoundPage/Loadable';
import styled, { ThemeProvider } from 'styled-components';

import { FormattedMessage } from 'react-intl';
import GlobalStyle from '../../global-styles';
import messages from './messages';
import theme from '../../theme';
import LoginContainer from 'containers/LoginContainer';

const Title = styled.div`
  font-size: 40px;
  margin: 4px 0 4px 6px;
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

const getAuth = () =>
  localStorage.getItem('username') &&
  localStorage.getItem('password') &&
  localStorage.getItem('username').length > 0 &&
  localStorage.getItem('password').length > 0;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Switch>
          <PrivateRoute
            path="/:path(authors|books)"
            component={() => (
              <Title>
                <FormattedMessage {...messages.header} />
              </Title>
            )}
          />
        </Switch>
        <Switch>
          <PrivateRoute
            path="/:path(authors|books)"
            component={SearchBarContainer}
          />
        </Switch>
        <Switch>
          <Route exact path="/login" component={LoginContainer} />
          <PrivateRoute exact path="/authors" component={Authors} />
          <PrivateRoute exact path="/books" component={Books} />
          <Route>
            <Redirect to="/login" />
          </Route>
        </Switch>
        <GlobalStyle />
      </Container>
    </ThemeProvider>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      getAuth() === true ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
