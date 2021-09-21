import styled from 'styled-components';
import { GetColor, GetBackgroundColor } from 'utils/colors';
import * as Base from './index';

const StyledButtonBase = styled(Base.Button)`
  overflow: hidden;
  border: none;
  border-radius: 4px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent;
  font-family: inherit;
  
  &:not([disabled]) {
    cursor:pointer
  }
  &:hover {
    -webkit-filter: brightness(90%);
  }`;

const Button = styled(StyledButtonBase)`
    transition: background 0.8s;
    color: ${(props) => (props.$color ? GetColor(props.$color) : 'inherit')};
    background-color: ${(props) => (props.$color ? GetBackgroundColor(props.$color) : 'inherit')};
`;
export const Outline = styled(StyledButtonBase)`
    color: ${(props) => (props.$color ? GetBackgroundColor(props.$color) : 'default')};
    background-color: transparent;
    border: solid 2px ${(props) => (props.$color ? GetBackgroundColor(props.$color) : 'default')};

    &:hover {
        color: ${(props) => (props.$color ? GetColor(props.$color) : 'default')};
        background-color: ${(props) => (props.$color ? GetBackgroundColor(props.$color) : 'default')};
    }
`;
export const Icon = styled.button`
  border:none;
  background:none !important;
  &:not([disabled]) {
    cursor:pointer
  }
`;

export const Styleless = styled(Icon)`
  padding:0
`

export default Button;
