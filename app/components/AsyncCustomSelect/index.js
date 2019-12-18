/**
 *
 * AsyncCustomSelect
 *
 */

import React, { Component } from 'react';

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
  }),
};

export default class WithPromises extends Component {
  state = { inputValue: '' };

  handleInputChange = newValue => {
    console.log(newValue);
    this.props.setSelected(newValue);
    const inputValue = newValue;
    this.setState({ inputValue });
    return inputValue;
  };

  render() {
    console.log(this.props.default);
    return (
      <AsyncSelect
        styles={customStyles}
        cacheOptions
        isSearchable
        name="lexile"
        placeholder={
          this.props.default &&
          `${this.props.default.lexile}L, ${this.props.default.title}, ${
            this.props.default.lexile_author
          }`
        }
        loadOptions={this.props.getOptions}
        onChange={this.handleInputChange}
        getOptionLabel={option =>
          `${option.lexile}L, ${option.title}, ${option.lexile_author}`
        }
      />
    );
  }
}
