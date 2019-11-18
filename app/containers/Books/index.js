/**
 *
 * Books
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
  makeBookListSelector,
  makeBookListLoaderSelector,
  makeBookListErrorSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import BookList from '../../components/BookList';
import { loadBooksFound } from './actions';

const ShowResults = ({ bookList }) =>
  bookList.length > 0 ? (
    <BookList bookList={bookList} />
  ) : (
    <div>No Results Found! </div>
  );

export function Books(props) {
  useInjectReducer({ key: 'books', reducer });
  useInjectSaga({ key: 'books', saga });

  const { bookList, dispatchLoadBooksFound, location, loading, error } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bookQuery = params.name;

  useEffect(() => {
    if (bookQuery && bookQuery.trim().length > 0)
      dispatchLoadBooksFound(bookQuery);
  }, [bookQuery]);

  if (error) console.log(`fetching error: ${error}`);

  return (
    <div>{loading ? <WaveLoading /> : <ShowResults bookList={bookList} />}</div>
  );
}

ShowResults.propTypes = { bookList: PropTypes.array };

Books.propTypes = {
  dispatchLoadBooksFound: PropTypes.func.isRequired,
  bookList: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  bookList: makeBookListSelector(),
  loading: makeBookListLoaderSelector(),
  error: makeBookListErrorSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadBooksFound: bookQuery => dispatch(loadBooksFound(bookQuery)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Books);
