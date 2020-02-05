/**
 *
 * Select
 *
 */

import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { space, layout, grid, flexbox } from 'styled-system';

const StyledReactSelect = styled(Select)`
  ${space};
  ${layout};
  ${grid};
  ${flexbox};
`;

export default ({ options, value, onChange, ...props }) => {
  const handleChange = (newValue, { action }) => {
    if (action === 'select-option') onChange({ target: { value: newValue } });
  };

  return (
    <StyledReactSelect
      classNamePrefix="react-select"
      value={value}
      onChange={handleChange}
      options={options}
      {...props}
    />
  );
};

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};
