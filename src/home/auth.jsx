import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	
`


function Display (props) {
	
	return (
		<StyledDiv>
			{ props.view === "reg" ? <h2> Registration Form </h2> : <h2> Log In Form </h2> }
		</StyledDiv>
	)
}


export default Display;