import styled from 'styled-components';
import { ColorType, GetColor, GetBackgroundColor } from 'utils/colors';


const Chip = styled.div`
display: inline-block;
padding: 0 1rem;
border-radius: 32px;
font-size: 13px;
height: 1.5rem;
line-height: 1.5rem;

color: ${({ color } : ({color? : ColorType})) => (color ? GetColor(color) : 'inherit')};
background-color: ${({ color } : ({color? : ColorType})) => (color ? GetBackgroundColor(color) : 'inherit')};
`;

export default Chip;
