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
	background: rgba(112, 128, 144, 0.8);
	height: 100%;

	section {
		width: 50%;
		opacity: 0.8;
		background: whitesmoke;
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

		let h1InnerText = "";

		if (this.state.view === "login") {
			h1InnerText = "Log In"
		} else if (this.state.view === "reg") {
			h1InnerText = "Create Account"
		}

		return (
			<StyledDiv>
				<section className="fullHeight">
					<div className="fullHeight">
						<Nav view={this.state.view} changeView={this.changeView} />
						<h2> { h1InnerText } </h2>
						{ this.state.view === "about" ? <About /> :
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