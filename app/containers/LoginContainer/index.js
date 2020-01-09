/**
 *
 * LoginContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectLoginContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import Login from 'components/Login';

export function LoginContainer(props) {
  const { dispatchRedirect } = props;
  useInjectReducer({ key: 'loginContainer', reducer });
  useInjectSaga({ key: 'loginContainer', saga });

  return <Login redirectTo={dispatchRedirect} />;
}

LoginContainer.propTypes = {
  dispatchRedirect: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginContainer: makeSelectLoginContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchRedirect: newLocation => dispatch(push(newLocation)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LoginContainer);
