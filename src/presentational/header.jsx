import React, { Component } from 'react';
import styled from 'styled-components';

// Styles: 
const StyledHeader = styled.header`
	h1 {
		color: red;
	}
`

function Header (props) {
	return (
		<StyledHeader>
			<h1> HEADER </h1>
		</StyledHeader>
	)
}


export default Header;