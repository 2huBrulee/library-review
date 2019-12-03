/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { margin } from 'styled-system';

const StyledSelect = styled.select`
  ${margin};
  box-sizing: content-box;
  height: 32px;
  min-width: 128px;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 4px 8px;
  color: #000000;
  font-size: 16px;
  background: #fafafa;
`;

const StyledOption = styled.option`
  color: #000000;
  background: #fafafa;
  white-space: pre;
  min-height: 25px;
  padding: 1px 10px;
`;

function Select(props) {
  const { options, placeholder } = props;
  return (
    <StyledSelect {...props}>
      <StyledOption key="default" defaultChecked hidden>
        {placeholder}
      </StyledOption>
      {options &&
        options.map(option => (
          <StyledOption key={`${option.value}`} value={option.value}>
            {option.label}
          </StyledOption>
        ))}
    </StyledSelect>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default Select;
