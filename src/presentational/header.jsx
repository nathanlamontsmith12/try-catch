import React from 'react';
//import styled from 'styled-components';

// Styles: 
// const StyledHeader = styled.header`

function Header (props) {

	const open = "{";

	return (
		<header>
			<h1> try <span>{ open }</span> </h1>
			<div>
				{ props.loggedIn ? <h1><span className="fakeLink">Logout</span></h1> : null }
			</div>
		</header>
	)
}


export default Header;