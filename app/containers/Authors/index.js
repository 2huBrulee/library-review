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
import { WaveLoading } from 'styled-spinkit';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeAuthorListSelector,
  makeAuthorListLoaderSelector,
  makeAuthorListErrorSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { loadAuthorsFound } from './actions';
import AuthorList from '../../components/AuthorList';
import NoSearchResults from '../../components/NoSearchResults';

const ShowResults = ({ authorList }) =>
  authorList.length > 0 ? (
    <AuthorList authorList={authorList} />
  ) : (
    <NoSearchResults />
  );

export function Authors(props) {
  useInjectReducer({ key: 'authors', reducer });
  useInjectSaga({ key: 'authors', saga });

  const {
    authorList,
    dispatchLoadAuthorsFound,
    location,
    loading,
    error,
  } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const authorQuery = params.full_name;

  useEffect(() => {
    if (authorQuery && authorQuery.trim().length > 0)
      dispatchLoadAuthorsFound(params);
  }, [location.search]);

  if (error) console.log(`fetching error: ${error}`);

  return (
    <div>
      {loading ? <WaveLoading /> : <ShowResults authorList={authorList} />}
    </div>
  );
}

ShowResults.propTypes = { authorList: PropTypes.array };

Authors.propTypes = {
  dispatchLoadAuthorsFound: PropTypes.func.isRequired,
  authorList: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  authorList: makeAuthorListSelector(),
  loading: makeAuthorListLoaderSelector(),
  error: makeAuthorListErrorSelector(),
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
