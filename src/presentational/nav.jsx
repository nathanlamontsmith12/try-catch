import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledNav = styled.nav `
	width: 100%;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 68px;

	span {
		font-size: 24px;
	}
`

function Nav (props) {
	return (
		<div className="outerNav">
			<h4> { props.username } </h4>
			<StyledNav>
				<Link style={{textDecoration: "none"}} to="/issues"> <span className="fakeLink">issues </span></Link>
				<Link style={{textDecoration: "none"}} to="/collab"> <span className="fakeLink"> collab </span></Link>
				<Link style={{textDecoration: "none"}} to="/profile"> <span className="fakeLink">profile </span> </Link>
				<Link style={{textDecoration: "none"}} to="/"> <span className="fakeLink" onClick={props.appLogout}> logout </span> </Link>
			</StyledNav>
		</div>
	)
}

export default Nav;