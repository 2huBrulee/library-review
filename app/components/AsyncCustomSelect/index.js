/**
 *
 * AsyncCustomSelect
 *
 */

import React, { useState, useEffect } from 'react';

import AsyncSelect from 'react-select/async';
/*
const filterColors = inputValue => colourOptions.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase()),
  );

const promiseOptions = inputValue =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(filterColors(inputValue));
    }, 1000);
  }); */

const customStyles = {
  container: base => ({
    ...base,
    flex: 1,
    maxWidth: 470,
  }),
};

export default props => {
  const [inputValue, setInputValue] = useState(null);
  const {
    showButtons,
    setSelected,
    editingLexile,
    defaultLexile,
    getOptions,
    book,
  } = props;

  const handleInputChange = newValue => {
    showButtons();
    setSelected(newValue);
    setInputValue(newValue);
    return newValue;
  };

  useEffect(() => {
    if (!editingLexile) {
      if (defaultLexile) {
        setInputValue(defaultLexile);
      } else {
        setInputValue(null);
      }
    }
  }, [editingLexile, defaultLexile]);

  return (
    <AsyncSelect
      value={inputValue}
      key={`my_unique_select_key__${inputValue}`}
      option
      styles={customStyles}
      cacheOptions
      isSearchable
      name="lexile"
      defaultInputValue={
        defaultLexile &&
        `${defaultLexile.lexile}L, ${defaultLexile.title}, ${
          defaultLexile.lexile_author
        }`
      }
      placeholder="Search for a book title"
      defaultOptions={defaultLexile ? [defaultLexile] : []}
      loadOptions={getOptions}
      onChange={handleInputChange}
      getOptionLabel={option =>
        `${option.lexile}L, ${option.title}, ${option.lexile_author}`
      }
    />
  );
};
