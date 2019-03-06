import React from 'react';
// import styled from 'styled-components';

// Styles: 
// const StyledFooter = styled.footer `
// 	position: fixed;
// 	left: 0;
// 	bottom: 0;
// 	width: 100%;
// 	display: flex;
// 	justify-content: flex-end;
// 	align-items: flex-start;

// 	span { 
// 		color: gray;
// 	}
// `

// 	background: rgba(255, 99, 71);   // tomato 

function Footer (props) {

	const close = "}";

	return (
		<footer>
			<div>
				<h1> <span> { close } </span> catch </h1>
			</div>
		</footer>
	)
}


export default Footer;