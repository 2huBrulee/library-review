/**
 *
 * Select
 *
 */

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledReactSelect = styled(Select)``;

export default props => {
  const { options, value, onChange } = props;

  const handleChange = (newValue, { action }) => {
    if (action === 'select-option') onChange({ target: { value: newValue } });
  };

  return (
    <StyledReactSelect
      value={value}
      onChange={handleChange}
      options={options}
    />
  );
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};
