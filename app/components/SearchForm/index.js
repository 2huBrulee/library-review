/**
 *
 * SearchForm
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import messages from './messages';

const Container = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  background-color: #fafafa;
  flex-direction: row;
  vertical-align: center;
  box-shadow: 0 4px 2px -2px lightgray;
`;

const SearchLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
`;

const SearchQueryInput = styled.input`
  height: 40px;
  min-width: 280px;
  border-radius: 5px;
  border-color: gray;
  border-width: thin;
  padding: 10px 15px;
  margin: 5px 15px 5px 5px;
  color: gray;
  font-size: 14px;
`;

const Select = styled.select`
  height: 40px;
  min-width: 12 0px;
  border-radius: 5px;
  border-color: gray;
  border-width: thin;
  padding: 10px 15px;
  margin: 5px 15px 5px 5px;
  color: gray;
  font-size: 14px;
  background: white;

  option {
    color: gray;
    background: white;
    font-weight: small;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

const Button = styled.button`
  width: 140px;
  margin: 5px 15px 5px 5px;
  background: rgb(255, 128, 0);
  border-width: 0;
  border-radius: 5px;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  justify-content: center;
  display: flex;
  font-size: 16px;
  color: white;
  cursor: pointer;
`;

function SearchForm(props) {
  const { history } = props;

  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('ALL');

  const handleQueryChange = e => setQuery(e.target.value);
  const handleOriginChange = e => setOrigin(e.target.value);

  const searchBooks = () => {
    const nameParams = encodeURI(query);
    let search = `?name=${nameParams}`;
    switch (origin) {
      case 'BASE':
      case 'AUT':
      case 'LEXILE':
      case 'MANU':
        search += `&origin=${origin}`;
        break;
      default:
        break;
    }
    history.push({
      pathname: '/books',
      search,
    });
  };

  const searchAuthors = () => {
    const nameParams = encodeURI(query);
    const search = `?full_name=${nameParams}`;
    history.push({
      pathname: '/authors',
      search,
    });
  };

  return (
    <Container>
      <SearchLabel>
        <FormattedMessage {...messages.searchLabel} />
      </SearchLabel>
      <SearchQueryInput
        onChange={handleQueryChange}
        value={query}
        placeholder="Enter Author's full name or Book Title"
      />
      <Select value={origin} onChange={handleOriginChange}>
        <option defaultValue value="ALL">
          ALL
        </option>
        <option value="BASE">BASE</option>
        <option value="AUT">AUT</option>
        <option value="LEXILE">LEXILE</option>
        <option value="MANU">MANU</option>
      </Select>
      <Button onClick={searchAuthors}>Search Authors</Button>
      <Button onClick={searchBooks}>Search Books</Button>
    </Container>
  );
}

SearchForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(SearchForm);
