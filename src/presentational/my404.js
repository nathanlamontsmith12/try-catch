import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';


// Styles: 
const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	section {
		height: 100%;
		width: 70%;
		opacity: 0.9;
		background: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	section div {
		height: 60%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
`

function My404 (props) {
  return(
    <StyledDiv>
    	<section>
    		<div>
			    <h2>Not all who wander are lost...</h2>
			    <h2> But you are.</h2> 
			    <p> If you are trying to access your dashboard, click <Link style={{textDecoration: "none"}} to="/"><span className="fakeLink">here</span></Link></p>
		    </div>
	    </section>
    </StyledDiv>
  )
}

export default My404;