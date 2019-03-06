import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

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
		<StyledNav>
			<span className="fakeLink"><Link to="/errors"> errors </Link></span>
			<span className="fakeLink"><Link to="/collab"> collab </Link></span>
			<span className="fakeLink"><Link to="/profile"> profile </Link></span>
		</StyledNav>
	)
}

export default Nav;