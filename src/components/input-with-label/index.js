import React from 'react';
import * as S from './styles';

const InputWithLabel = ({
  children, id, type = 'text', placeholder = '', value, onChange,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    <S.Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </>
);

export default InputWithLabel;
