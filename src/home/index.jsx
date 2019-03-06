import React, { Component } from 'react';
import styled from 'styled-components';

// Components: 
import Nav from './nav';
import Auth from './auth';
import About from './about';

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
		width: 70%;
		opacity: 0.9;
		background: white;
	}
`

class Home extends Component {
	constructor(){
		super();
		this.state = {
			view: "reg"
		}
	}
	changeView = (view) => {
		this.setState({
			view: view 
		})
	}
	login = (formData) => {
		console.log("LOGIN: ", formData);
	}
	register = (formData) => {
		console.log("REGISTER: ", formData);
	}
	render(){
		return (
			<StyledDiv>
				<section className="fullHeight">
					<Nav view={this.state.view} changeView={this.changeView} />
					<div className="center">
						{ this.state.view === "about" ? 
							
							<About /> 

							:
							
							<Auth 
								view={this.state.view} 
								login={this.login} 
								register={this.register} 
							/>  
						}
					</div>
				</section>
			</StyledDiv>
		)
	}
}

export default Home;