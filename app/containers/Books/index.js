/**
 *
 * Books
 *
 */

import React, { useEffect, useState } from 'react';
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
  makePatchSuccessBooksSelector,
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
  batchHide,
  batchSetReference,
} from './actions';
import NoSearchResults from '../../components/NoSearchResults';
import SelectedItem from '../../components/SelectedItem';
import Modal from '../../components/Modal';

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
    dispatchBatchLink,
    dispatchBatchHide,
    location,
    loading,
    error,
    baseBookSelected,
    duplicatedBooks,
    patchSuccessBooks,
  } = props;
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const bookQuery = params.name;

  useEffect(() => {
    if (bookQuery && bookQuery.trim().length > 0)
      dispatchLoadBooksFound(bookQuery);
  }, [bookQuery]);

  if (error) console.log(`fetching error: ${error}`);

  const batchHideAction = () => {
    showModal();
    dispatchBatchHide(duplicatedBooks);
  };

  const batchLinkingAction = () => {
    showModal();
    dispatchBatchLink(duplicatedBooks, baseBookSelected);
  };

  const [isModalVisible, setModalVisibility] = useState(false);

  const hideModal = () => setModalVisibility(false);
  const showModal = () => setModalVisibility(true);

  return (
    <div>
      <Modal visible={isModalVisible} hide={hideModal}>
        <div>You have modified the following book(s):</div>
        {duplicatedBooks &&
          duplicatedBooks.map(duplicatedBook => (
            <div key={`dupli-${duplicatedBook.text_id}`}>
              <strong>Title: </strong>
              {duplicatedBook.title}
              <strong> Matilda ID: </strong>
              {duplicatedBook.text_id}
            </div>
          ))}
      </Modal>
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
        <BookHandling
          batchHide={batchHideAction}
          batchLinking={batchLinkingAction}
          selected={!!baseBookSelected.gr_id}
        />
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
  duplicatedBooks: PropTypes.array,
  clearDuplicate: PropTypes.func.isRequired,
};

Books.propTypes = {
  dispatchLoadBooksFound: PropTypes.func.isRequired,
  dispatchSelectBaseBook: PropTypes.func.isRequired,
  dispatchSelectDuplicate: PropTypes.func.isRequired,
  dispatchClearSelection: PropTypes.func.isRequired,
  dispatchClearDuplicate: PropTypes.func.isRequired,
  dispatchBatchHide: PropTypes.func.isRequired,
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
  patchSuccessBooks: makePatchSuccessBooksSelector(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLoadBooksFound: bookQuery => dispatch(loadBooksFound(bookQuery)),
    dispatchSelectBaseBook: book => dispatch(setSelectedBook(book)),
    dispatchSelectDuplicate: book => dispatch(setDuplicate(book)),
    dispatchClearSelection: () => dispatch(clearSelected()),
    dispatchClearDuplicate: book => dispatch(clearDuplicate(book)),
    dispatchBatchHide: booksToHide => dispatch(batchHide(booksToHide)),
    dispatchBatchLink: (booksToLink, referenceBook) =>
      dispatch(batchSetReference(booksToLink, referenceBook)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Books);
