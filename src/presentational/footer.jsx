import React, { Component } from 'react';
import styled from 'styled-components';

// Styles: 
const StyledFooter = styled.footer `
	display: flex;
	justify-content: center;
	align-items: center;
	background: red;
`

function Footer (props) {
	return (
		<StyledFooter>
			<p> Footer </p>
		</StyledFooter>
	)
}


export default Footer;