import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav `
	display: flex;
	justify-content: space-around;
	align-items: center;
`

function Nav (props) {
	return (
		<StyledNav>
			<span className="fakeLink" onClick={props.changeView.bind(null, "reg")} > sign up </span>
			<span className="fakeLink" onClick={props.changeView.bind(null, "login")} > log in </span>
			<span className="fakeLink" onClick={props.changeView.bind(null, "about")} > about </span>
		</StyledNav>
	)
}

export default Nav;