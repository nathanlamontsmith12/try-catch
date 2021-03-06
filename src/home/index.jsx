import React, { Component } from 'react';
import styled from 'styled-components';

// Components: 
import Nav from './nav';
import Auth from './auth';
import About from './about';


// Styles: 
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
			view: "reg",
			message: ""
		}
	}
	changeView = (view) => {
		this.setState({
			view: view, 
			message: ""
		})
	}
	setMessage = (message) => {
		this.setState({
			message: message 
		})
	}
	login = async (formData) => {
		try {

			const username = formData.username;
			const password = formData.password; 
			const regTime = Date.now();

			const url = `${process.env.REACT_APP_API_URL}/api/v1/user/login`

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					username: username,
					password: password,
					regTime: regTime
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			if (!responseJson.done || !responseJson.login) {
				this.setMessage("wrong username/password")
			} else {
				// this.props.appLogin(userData)			

				const userData = {
					username: responseJson.username,
					userId: responseJson.userId, 
					regTime: responseJson.reg_time
				}

				this.props.appLogin(userData)
			}

		} catch(err) {
			console.log("ERROR: ", err);
			this.setMessage("Failed to log in to account") 
			return err
		}
	}
	register = async (formData) => {
		try {

			const username = formData.username;
			const password = formData.password; 
			const email = formData.email;
			const regTime = Date.now();

			const url = `${process.env.REACT_APP_API_URL}/api/v1/user`

			const response = await fetch(url, {
				method: 'POST',
				credentials: 'include',
				body: JSON.stringify({
					username: username,
					password: password,
					email: email,
					regTime: regTime
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			})

			const responseJson = await response.json();
			// console.log("RESPONSE: ", responseJson)

			if (!responseJson.done || !responseJson.login) {
				this.setMessage("Account already exists")
			} else {
				// this.props.appLogin(userData)			

				const userData = {
					username: responseJson.username,
					userId: responseJson.userId, 
					regTime: responseJson.reg_time
				}

				this.props.appLogin(userData)
			}

		} catch(err) {
			console.log("ERROR: ", err);
			this.setMessage("Failed to create account") 
			return err
		}

	}
	render(){
		return (
			<StyledDiv>
				<section className="fullHeight">
					<Nav view={this.state.view} changeView={this.changeView} clearMessage={this.clearMessage} />
					<div className="center">
						{ this.state.view === "about" ? 
							
							<About /> 

							:
							
							<Auth 
								view={this.state.view}
								message={this.state.message} 
								setMessage={this.setMessage}
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