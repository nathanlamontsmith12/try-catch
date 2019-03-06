import React from 'react';
import styled from 'styled-components';

// Styles: 
const StyledHeader = styled.header`
	background: rgba(255, 99, 71, 0.8);
	height: 30vh;
	display: flex;
	align-items: center;

	div {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 80%;
	}

	h1 {
		font-size: 48px;
		color: crimson;
		background: white;
		margin-left: 60px;
		display: inline-block;
		padding: 10px;
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