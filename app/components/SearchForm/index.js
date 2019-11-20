/**
 *
 * SearchForm
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import qs from 'qs';
import Sticky from 'react-sticky-el';
import messages from './messages';

const Container = styled.div`
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
  border-style: solid;
  padding: 10px 15px;
  margin: 5px 15px 5px 5px;
  color: gray;
  font-size: 14px;
  ${({ isHelperVisible }) =>
    isHelperVisible &&
    `border-color: red;
     border-width:2px;
    `}
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

const ValidateHelper = styled.div`
  color: red;
  font-size: 8px;
  margin: 0 15px 0 5px;
  padding: 0px 5px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function SearchForm(props) {
  const { history, location } = props;

  const [query, setQuery] = useState('');
  const [origin, setOrigin] = useState('ALL');
  const [isHelperVisible, setHelperVisibility] = useState(false);

  const handleQueryChange = e => {
    setQuery(e.target.value);
    setHelperVisibility(validate(e.target.value));
  };
  const handleOriginChange = e => {
    setOrigin(e.target.value);
  };

  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  useEffect(() => {
    setQuery(params.name || params.full_name || '');
  }, [location]);

  const validate = fieldContent => fieldContent.length < 1;

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
    <Sticky stickyStyle={{
      backgroundColor: '#fafafa',
      zIndex: 99999,
    }}>
      <Container>
        <SearchLabel>
          <FormattedMessage {...messages.searchLabel} />
        </SearchLabel>
        <InputWrapper>
          <SearchQueryInput
            isHelperVisible={isHelperVisible}
            onChange={handleQueryChange}
            value={query}
            placeholder="Enter Author's full name or Book Title"
          />
          {isHelperVisible ? (
            <ValidateHelper>Field cannot be empty</ValidateHelper>
          ) : null}
        </InputWrapper>
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
    </Sticky>
  );
}

SearchForm.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(SearchForm);
