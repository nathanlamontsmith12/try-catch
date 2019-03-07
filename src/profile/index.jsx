import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;
	background: rgba(255, 99, 71, 0.8); 
	height: 100%;

	div {
		height: 100%;
	}

	.center {
		display: flex;
		justify-content: center;
	}

	section {
		height: 100%;
		width: 70%;
		opacity: 0.9;
		background: white;
	}
`

class Profile extends Component {
	constructor(){
		super();
		this.state = {

		}
	}
	render(){
		return (
			<StyledDiv>
				<section>
					<h1> Profile </h1>
				</section>
			</StyledDiv>
		)
	}
}




export default Profile;
