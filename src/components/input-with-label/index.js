import React from 'react';
import styled from 'styled-components';

export const StyledInput = styled.input`
    border: none;
    max-width: 100%;
    width: 100%;
    font-size: 1em
    &:focus {
      outline:none
    }
    &:focus-visible {
      outline:none
    }
`;

const InputWithLabel = ({
  children, id, type = 'text', placeholder = '', value, onChange,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    <StyledInput
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

export default InputWithLabel;
