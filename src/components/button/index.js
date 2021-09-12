import React from 'react';
import styled from 'styled-components';
import { GetColor, GetBackgroundColor } from 'utils/colors';

function createRipple(event) {
  const button = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];

  if (ripple) ripple.remove();
  button.appendChild(circle);
}
const rippleThenFunc = (event, func) => {
  createRipple(event);
  func(event);
};

const Button = ({
  children,
  ripple = false,
  type = 'button',
  onClick = () => {},
  ...props
}) => (
  <button
    type={type}
    onClick={ripple ? (e) => rippleThenFunc(e, onClick) : onClick}
    {...props}
  >
    {children}
  </button>
);

export const StyledButton = styled(Button)`
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
    
    color: ${(props) => (props.color ? GetColor(props.color) : 'inherit')};
    background-color: ${(props) => (props.color ? GetBackgroundColor(props.color) : 'inherit')};

    transition: background 0.8s;
    

    &:not([disabled]) {
        cursor:pointer
    }
    &:hover {
        -webkit-filter: brightness(90%);
    }
`;
export const StyledButtonOutline = styled(Button)`
    border: none;
    border-radius: 4px;
    display: inline-block;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    font-family: inherit;
    
    border: solid 2px ${(props) => (props.color ? GetBackgroundColor(props.color) : 'default')};
    color: ${(props) => (props.color ? GetBackgroundColor(props.color) : 'default')};
    background-color: none;

    &:not([disabled]) {
        cursor:pointer
    }
    &:hover {
        color: ${(props) => (props.color ? GetColor(props.color) : 'default')};
        background-color: ${(props) => (props.color ? GetBackgroundColor(props.color) : 'default')};
    }
`;

export default Button;
