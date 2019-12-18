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
    return (
      <AsyncSelect
        cacheOptions
        isSearchable
        name="lexile"
        loadOptions={this.props.getOptions}
        onChange={this.handleInputChange}
        getOptionLabel={option =>
          `${option.lexile_id}L, ${option.title}, ${option.lexile_author}`
        }
      />
    );
  }
}
