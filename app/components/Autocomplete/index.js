/**
 *
 * Autocomplete
 *
 */

import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, border, size } from 'styled-system';
import OutsideClickHandler from 'react-outside-click-handler';
import useDebounce from 'utils/useDebounce';

const Container = styled.div`
  ${space};
  position: relative;
  box-sizing: border-box;
  display: inline-block;
`;

const Input = styled.input`
  ${space};
  height: 32px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
`;

const AutocompleteItemsWrapper = styled.div`
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
`;

const AutocompleteItems = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  &:hover {
    background-color: #e9e9e9;
  }
`;

function Autocomplete(props) {
  const [showingOptions, toggleShowOptions] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState([]);
  const [searchActive, setSearchActive] = useState(false);

  const { getOptions, setSelected, baseSearch } = props;

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  const onOptionClick = option => {
    setSearchActive(false);
    setSearchTerm(option.title);
    setSelected(option);
    toggleShowOptions(false);
  };

  useEffect(
    () => {
      // Make sure we have a value (user has entered something in input)
      if (searchActive) {
        if (debouncedSearchTerm) {
          // Fire off our API call
          getOptions(debouncedSearchTerm).then(results => {
            // Set results state
            console.log(results);
            toggleShowOptions(true);
            setOptions(results);
          });
        } else {
          setOptions([]);
        }
      }
    },
    // This is the useEffect input array
    // Our useEffect function will only execute if this value changes ...
    // ... and thanks to our hook it will only change if the original ...
    // value (searchTerm) hasn't changed for more than 500ms.
    [debouncedSearchTerm],
  );

  useEffect(() => {
    setSearchActive(true);
    setSearchTerm(baseSearch);
  }, []);

  const onInputChange = inputValue => {
    setSearchActive(true);

    setSearchTerm(inputValue);
    if (inputValue === '') {
      setSelected(null);
      toggleShowOptions(false);
    }
  };

  return (
    <Container mx={1} my={2}>
      <Input
        px={2}
        py={1}
        value={searchTerm}
        onChange={e => onInputChange(e.target.value)}
      />
      <OutsideClickHandler onOutsideClick={() => toggleShowOptions(false)}>
        {showingOptions && (
          <AutocompleteItemsWrapper>
            {options.map(option => (
              <AutocompleteItems
                key={option.lexile_id}
                onClick={() => onOptionClick(option)}
              >
                {option.title}
              </AutocompleteItems>
            ))}
          </AutocompleteItemsWrapper>
        )}
      </OutsideClickHandler>
    </Container>
  );
}

Autocomplete.propTypes = {};

export default Autocomplete;
