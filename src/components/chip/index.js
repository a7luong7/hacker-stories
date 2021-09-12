import React from 'react';
import styled from 'styled-components';
import { GetColor, GetBackgroundColor } from 'utils/colors';

const ChipPlain = ({ children, ...props }) => (<div {...props}>{children}</div>);

const Chip = styled(ChipPlain)`
display: inline-block;
padding: 0 1rem;
border-radius: 32px;
font-size: 13px;
height: 1.5rem;
line-height: 1.5rem;

color: ${(props) => (props.color ? GetColor(props.color) : 'inherit')};
background-color: ${(props) => (props.color ? GetBackgroundColor(props.color) : 'inherit')};
`;

export default Chip;
