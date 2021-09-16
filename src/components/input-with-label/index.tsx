import React from 'react';
import * as S from './styles';

type InputTypes = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" | "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" | "time" | "url" | "week"
type InputWithLabelProps = {
  id: string,
  type?: InputTypes,
  placeholder?: string,
  value: any,
  onChange: (event: React.ChangeEvent) => void,
  children?: React.ReactNode
}
const InputWithLabel = ({
  children, 
  id, 
  type = 'text', 
  placeholder = '', 
  value, 
  onChange,
} : InputWithLabelProps) => (
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
