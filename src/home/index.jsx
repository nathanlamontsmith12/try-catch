import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	display: flex;
	justify-content: center;
	align-items: center;

	section {
		width: 50%;
		color: whitesmoke;
		opacity: 0.8;
	}
`

class Home extends Component {
	constructor(){
		super();
		this.state = {
			view: "reg" // acceptable: "reg", "login", "about"
		}
	}
	render(){
		return (
			<StyledDiv>
				<section>
					<h1>HOME PAGE</h1>
				</section>
			</StyledDiv>
		)
	}
}

export default Home;