import React from 'react';
//import styled from 'styled-components';

// Styles: 
// const StyledHeader = styled.header`
// 	display: flex;
// 	align-items: flex-end;
// 	justify-content: flex-start;
// 	width: 100%;

// 	span {
// 		color: gray;
// 	}
// `

	// div {
	// 	display: inline-flex;
	// 	align-items: center;
	// 	justify-content: center;
	// 	height: 80%;
	// }
//	background: rgba(255, 99, 71, 0.8); 
// transparent tomato

function Header (props) {

	const open = "{";

	return (
		<header>
			<h1> try <span>{ open }</span> </h1>
		</header>
	)
}


export default Header;