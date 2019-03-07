import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	height: 100%;
	margin-top: 40px;
	margin-left: 30%;

	div {
		width: 60%;
	}
`

function About (props) {
	return (
		<StyledDiv>
			<div>
				<h2> about </h2>
				<p> 
					<br />
					<br />
					Try / Catch is a collaborative error handling app to help programmers who are branching into new languages, libraries, or frameworks.
					<br />
					<br />
					Sign in, search and add collaborators, and never fear error messages
				</p>
			</div>
		</StyledDiv>
	)
}


export default About;