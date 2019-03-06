import React, { Component } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div `
	input {
		display: block;
	}
`


class Auth extends Component {
	constructor(props){
		super();
		this.state = {
			username: "",
			email: "",
			password: "",
			confirmation: "",
			message: "",
			processing: false
		}
	}
	handleChange = (evt) => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}
	quickCheck = (type) => {

		if (type === "reg") {
			if (this.state.password !== this.state.confirmation) {
				this.quickFail("Password must match confirmation")
				return false
			}
			if (!this.state.email) {
				this.quickFail("Email required for registration")
				return false 
			}
		} 

		if (!this.state.username || !this.state.password) {
			this.quickFail("Invalid input")
			return false 
		}

	}
	quickFail = (message) => {
		this.setState({
			username: "",
			email: "",
			password: "",
			confirmation: "",
			processing: false,
			message: message			
		})
	}
	submit = (type) => {

		if (!this.quickCheck(type)) {
			return 
		}

		const authData = this.state;

		this.setState({
			username: "",
			email: "",
			password: "",
			confirmation: "",
			message: "Processing..."
		})

		if (type === "reg") {
			this.props.register(authData)
			return
		} else if (type === "login") {
			this.props.login(authData)
			return
		} else {
			this.quickFail("Unknown Error")
			return
		}
	}
	// componentDidMount() {
	// 	this.setState({
	// 		message: ""
	// 	})
	// }
	render() {
		return (
			<StyledDiv>
				{ this.state.message ? <h4> {this.state.message} </h4> : <h4> &nbsp; </h4>}
				<form> 
					<input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Enter username..." /> 
					{ this.props.view === "reg" ? <input name="email" type="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email..." /> : null }
					<input name="password" type="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password..."/>
					{ this.props.view === "reg" ? <input name="confirmation" type="password" value={this.state.confirmation} onChange={this.handleChange} placeholder="Confirm password..." /> : null }
					{ this.props.view === "reg" ? <button onClick={this.submit.bind(null, "reg")}> make account </button> : <button onClick={this.submit.bind(null, "login")}> log in </button>}
				</form>
			</StyledDiv>
		)
	}
}

	// view={this.state.view} 
	// handleChange={this.handleChange} 
	// submit={this.submit} 
	// login={this.login} 
	// register={this.register} 


export default Auth;