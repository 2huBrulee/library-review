/**
 *
 * Authors
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import qs from 'qs';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeAuthorListSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadAuthorsFound } from './actions';
import AuthorList from '../../components/AuthorList';

export function Authors(props) {
  useInjectReducer({ key: 'authors', reducer });
  useInjectSaga({ key: 'authors', saga });

  const { authorList, dispatchLoadAuthorsFound, location } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const authorQuery = params.full_name;

  useEffect(() => {
    if (authorQuery && authorQuery.trim().length > 0)
      dispatchLoadAuthorsFound(authorQuery);
  }, [authorQuery]);

  console.log(authorList);
  return (
    <div>
      <AuthorList authorList={authorList} key={authorQuery} />
    </div>
  );
}

Authors.propTypes = {
  dispatchLoadAuthorsFound: PropTypes.func.isRequired,
  authorList: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authorList: makeAuthorListSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadAuthorsFound: authorQuery =>
      dispatch(loadAuthorsFound(authorQuery)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Authors);
