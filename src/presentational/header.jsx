import React from 'react';
import styled from 'styled-components';

// Styles: 
const StyledHeader = styled.header`
	h1 {
		color: crimson;
		margin-left: 60px;
	}

	span {
		color: gray;
	}
`

function Header (props) {

	const open = "{";
	const close = "}";

	return (
		<StyledHeader>
			<h1> try <span>{ open }</span> <br /> <span>{ close }</span> catch </h1>
		</StyledHeader>
	)
}


export default Header;