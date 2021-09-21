import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
max-width:1000px;
margin: 0 auto;
padding: 0;
`

export const StyledContainer = styled(Container)`
background-color: #fff;
color: #171212;
padding: .5rem;
border-radius:.5rem;
webkit-box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);
box-shadow: 0 15px 35px rgb(50 50 93 / 10%), 0 5px 15px rgb(0 0 0 / 7%);

margin-top: 1rem;
margin-bottom: 1rem;
`;



// export default {
//   StyledContainer,
// };
