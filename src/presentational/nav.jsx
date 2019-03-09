import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledDiv = styled.div `
	width: 70%;
`

const StyledNav = styled.nav `
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
		<StyledDiv>
			<StyledNav>
				<Link style={{textDecoration: "none"}} to="/issues"> <span className="fakeLink">issues </span></Link>
				<Link style={{textDecoration: "none"}} to="/collab"> <span className="fakeLink"> collab </span></Link>
				<Link style={{textDecoration: "none"}} to="/profile"> <span className="fakeLink">profile </span> </Link>
				<Link style={{textDecoration: "none"}} to="/"> <span className="fakeLink" onClick={props.appLogout}> logout </span> </Link>
			</StyledNav>
		</StyledDiv>
	)
}

export default Nav;