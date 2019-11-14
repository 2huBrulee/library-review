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
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeBookListSelector } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import BookList from '../../components/BookList';
import { loadBooksFound } from './actions';

export function Books(props) {
  useInjectReducer({ key: 'books', reducer });
  useInjectSaga({ key: 'books', saga });

  const { bookList, dispatchLoadBooksFound, location } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bookQuery = params.name;

  useEffect(() => {
    if (bookQuery && bookQuery.trim().length > 0)
      dispatchLoadBooksFound(bookQuery);
  }, [bookQuery]);

  return (
    <div>
      <BookList bookList={bookList} key={bookQuery} />
    </div>
  );
}

Books.propTypes = {
  dispatchLoadBooksFound: PropTypes.func.isRequired,
  bookList: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  bookList: makeBookListSelector(),
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
