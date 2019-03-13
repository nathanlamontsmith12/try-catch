import React from 'react';
// import styled from 'styled-components';

// Components: 
import Nav from '../presentational/nav';

// Styles: 
// const StyledHeader = styled.header `

// `

function Header (props) {

	let height = {height: 80};

	if (props.loggedIn) {
		height = {height: 130};	
	}

	const open = "{";
	const close = "}";

	return (
		<header style={height} >
				{ !props.loggedIn ? <h1> try <span>{ open }</span> </h1> : <h1> try <span>{ open }</span> <br /> <span>{ close }</span> catch </h1>}
				{ props.loggedIn ? <Nav history={props.history} appLogout = {props.appLogout} username={props.username} /> : null }
		</header>
	)
}


export default Header;