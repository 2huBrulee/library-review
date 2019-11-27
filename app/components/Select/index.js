/**
 *
 * Select
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSelect = styled.select`
  box-sizing: content-box;
  height: 30px;
  min-width: 150px;
  border: 1px solid #707070;
  border-radius: 5px;
  padding: 5px 10px;
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
          <StyledOption key={`${option.value}`}>{option.label}</StyledOption>
        ))}
    </StyledSelect>
  );
}

Select.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
};

export default Select;
