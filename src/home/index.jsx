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

	section {
		width: 50%;
		opacity: 0.8;
	}
`

class Home extends Component {
	constructor(){
		super();
		this.state = {
			view: "reg", 
			username: "",
			email: "",
			password: "",
			confirmation: ""
		}
	}
	changeView = (view) => {
		this.setState({
			view: view 
		})
	}
	handleChange = (evt) => {
		console.log(evt);
	}
	submit = (evt, route) => {
		evt.preventDefault();
		console.log(evt);
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
				<section>
					<Nav view={this.state.view} changeView={this.changeView} />
					<h1> { h1InnerText } </h1>
					{ this.state.view === "about" ? <About /> :
						<Auth 
							view={this.state.view} 
							handleChange={this.handleChange} 
							submit={this.submit} 
							login={this.login} 
							register={this.register} 
						/>  
					}
				</section>
			</StyledDiv>
		)
	}
}

export default Home;