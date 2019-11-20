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
  makeBaseBookSelector,
  makeDuplicatedBooksSelector,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import BookList from '../../components/BookList';
import BookHandling from '../../components/BookHandling';
import {
  loadBooksFound,
  setSelectedBook,
  setDuplicate,
  clearSelected,
  clearDuplicate,
} from './actions';
import NoSearchResults from '../../components/NoSearchResults';
import SelectedItem from '../../components/SelectedItem';

const ShowResults = ({
  bookList,
  dispatchSelectBaseBook,
  dispatchSelectDuplicate,
  searchingForDuplicates,
  duplicatedBooks,
  clearDuplicate,
}) =>
  bookList.length > 0 ? (
    <BookList
      searchingForDuplicates={searchingForDuplicates}
      bookList={bookList}
      selectBaseBook={dispatchSelectBaseBook}
      selectDuplicate={dispatchSelectDuplicate}
      clearDuplicate={clearDuplicate}
      duplicatedBooks={duplicatedBooks}
    />
  ) : (
    <NoSearchResults />
  );

export function Books(props) {
  useInjectReducer({ key: 'books', reducer });
  useInjectSaga({ key: 'books', saga });

  const {
    bookList,
    dispatchLoadBooksFound,
    dispatchSelectBaseBook,
    dispatchClearSelection,
    dispatchClearDuplicate,
    dispatchSelectDuplicate,
    location,
    loading,
    error,
    baseBookSelected,
    duplicatedBooks,
  } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bookQuery = params.name;

  useEffect(() => {
    if (bookQuery && bookQuery.trim().length > 0)
      dispatchLoadBooksFound(bookQuery);
  }, [bookQuery]);

  if (error) console.log(`fetching error: ${error}`);

  return (
    <div>
      {baseBookSelected.gr_id ? (
        <SelectedItem
          baseBookSelected={baseBookSelected}
          duplicatedBooks={duplicatedBooks}
          clearSelection={dispatchClearSelection}
          clearDuplicate={dispatchClearDuplicate}
          book={baseBookSelected}
        />
      ) : null}
      {duplicatedBooks && duplicatedBooks.length > 0 ? (
        <BookHandling selected={!!baseBookSelected.gr_id} />
      ) : null}

      {loading ? (
        <WaveLoading />
      ) : (
        <ShowResults
          searchingForDuplicates={!!baseBookSelected.gr_id}
          dispatchSelectBaseBook={dispatchSelectBaseBook}
          dispatchSelectDuplicate={dispatchSelectDuplicate}
          clearDuplicate={dispatchClearDuplicate}
          duplicatedBooks={duplicatedBooks}
          bookList={bookList}
        />
      )}
    </div>
  );
}

ShowResults.propTypes = {
  bookList: PropTypes.array,
  dispatchSelectBaseBook: PropTypes.func.isRequired,
  dispatchSelectDuplicate: PropTypes.func.isRequired,
  searchingForDuplicates: PropTypes.bool,
};

Books.propTypes = {
  dispatchLoadBooksFound: PropTypes.func.isRequired,
  dispatchSelectBaseBook: PropTypes.func.isRequired,
  dispatchSelectDuplicate: PropTypes.func.isRequired,
  dispatchClearSelection: PropTypes.func.isRequired,
  dispatchClearDuplicate: PropTypes.func.isRequired,
  bookList: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.object,
  location: PropTypes.object,
  baseBookSelected: PropTypes.object,
  duplicatedBooks: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  bookList: makeBookListSelector(),
  loading: makeBookListLoaderSelector(),
  error: makeBookListErrorSelector(),
  baseBookSelected: makeBaseBookSelector(),
  duplicatedBooks: makeDuplicatedBooksSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadBooksFound: bookQuery => dispatch(loadBooksFound(bookQuery)),
    dispatchSelectBaseBook: book => dispatch(setSelectedBook(book)),
    dispatchSelectDuplicate: book => dispatch(setDuplicate(book)),
    dispatchClearSelection: () => dispatch(clearSelected()),
    dispatchClearDuplicate: book => dispatch(clearDuplicate(book)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Books);
