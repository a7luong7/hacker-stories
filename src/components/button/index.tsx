import React from 'react';
import * as ColorTypes from '../../utils/colors'

const createRipple = (event: any) : void => {
  const button = event.currentTarget;

  const circle = document.createElement('span');
  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = `${diameter}px`;
  circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
  circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];
  if (ripple) ripple.remove();

  button.appendChild(circle);
};
const rippleThenFunc = (
  event: any, 
  func: (event:any) => any
) : void => {
  createRipple(event);
  func(event);
};

type ButtonType = 'button' | 'submit' | 'reset'
type ButtonProps = {
  children: React.ReactNode,
  ripple?: boolean,
  disabled? : boolean,
  type?: ButtonType,
  $color?: ColorTypes.ColorType, 
  onClick: (event: React.MouseEvent) => void
}
export const Button = ({
  children,
  ripple = false,
  disabled = false,
  type = 'button',
  $color,
  onClick = () => {},
  ...props
}:ButtonProps) => (
  <button
    type={type}
    disabled={disabled}
    onClick={ripple ? (e) => rippleThenFunc(e, onClick) : onClick}
    {...props}
  >
    {children}
  </button>
);

export default {};
