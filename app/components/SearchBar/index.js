/**
 *
 * SearchBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from '../Select';
import TextInput from '../TextInput';
import Button from '../Button';

const Wrapper = styled.div`
  width: 100%;

  @media ${props => props.theme.devices.mobileM} {
    background-color: green;
  }

  @media ${props => props.theme.devices.laptop} {
    background-color: red;
  }
`;

function SearchBar(props) {
  return (
    <Wrapper {...props}>
      <Select />
      <TextInput />
      <Select />
      <Button>Search</Button>
    </Wrapper>
  );
}

SearchBar.propTypes = {};

export default SearchBar;
